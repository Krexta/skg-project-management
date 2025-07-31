function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
import { Body, Controller, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiConsumes, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ProjectScenario } from "../../../application/scenario/project/index.js";
import { CustomLogger } from "../../../utility/index.js";
import { ProjectCreateRequest } from "../request/index.js";
import { ProjectResponse } from "../response.js";
export class ProjectCreateController {
    async create(body) {
        return await this.scenario.pushProject(body);
    }
    constructor(logger, scenario){
        this.logger = logger;
        this.scenario = scenario;
        this.logger.setContext(ProjectCreateController.name);
    }
}
_ts_decorate([
    Post(),
    ApiConsumes('application/json'),
    ApiOperation({
        description: 'Create Project'
    }),
    ApiOkResponse({
        type: ProjectResponse
    }),
    ApiBadRequestResponse({
        description: 'リクエスト内容が不正'
    }),
    ApiInternalServerErrorResponse({
        description: 'サーバーエラー'
    }),
    ApiUnauthorizedResponse({
        description: '認証エラー'
    }),
    _ts_param(0, Body()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof ProjectCreateRequest === "undefined" ? Object : ProjectCreateRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], ProjectCreateController.prototype, "create", null);
ProjectCreateController = _ts_decorate([
    ApiTags('Projects'),
    Controller('projects'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CustomLogger === "undefined" ? Object : CustomLogger,
        typeof ProjectScenario === "undefined" ? Object : ProjectScenario
    ])
], ProjectCreateController);

//# sourceMappingURL=create.controller.js.map