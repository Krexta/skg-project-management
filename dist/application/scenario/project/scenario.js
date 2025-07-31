function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
import { BadGatewayException, BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ProjectRepository } from "../../../domain/repository/index.js";
import { ProjectId } from "../../../domain/value/index.js";
import { CustomLogger } from "../../../utility/index.js";
import { ProjectParser } from "./parser.js";
export class ProjectScenario {
    async pushProject(input) {
        try {
            const entity = this.parser.convertToProjectEntity(input);
            const result = await this.repository.pushProject(entity);
            return this.parser.convertToReference(result);
        } catch (error) {
            if ([
                BadRequestException,
                BadGatewayException
            ].includes(error.constructor)) {
                throw error;
            }
            this.logger.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }
    async updateProject(projectId, input) {
        try {
            const project = await this.repository.getById(ProjectId.from(projectId));
            if (!project) {
                throw new NotFoundException('Project not found');
            }
            const dataFormatted = this.parser.formatDataUpdateProject(input);
            const updateData = project.update(dataFormatted);
            const result = await this.repository.update(updateData);
            return this.parser.convertToReference(result);
        } catch (error) {
            if ([
                BadRequestException,
                BadGatewayException,
                NotFoundException
            ].includes(error.constructor)) {
                throw error;
            }
            this.logger.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }
    constructor(logger, repository){
        this.logger = logger;
        this.repository = repository;
        this.logger.setContext(ProjectScenario.name);
        this.parser = new ProjectParser(this.logger);
    }
}
ProjectScenario = _ts_decorate([
    Injectable(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CustomLogger === "undefined" ? Object : CustomLogger,
        typeof ProjectRepository === "undefined" ? Object : ProjectRepository
    ])
], ProjectScenario);

//# sourceMappingURL=scenario.js.map