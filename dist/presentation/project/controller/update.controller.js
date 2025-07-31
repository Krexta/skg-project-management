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
import { Body, Controller, Param, Patch } from "@nestjs/common";
import { ApiBadRequestResponse, ApiConsumes, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ProjectScenario } from "../../../application/scenario/project/index.js";
import { CustomLogger } from "../../../utility/index.js";
import { ProjectUpdateRequest } from "../request/index.js";
import { ProjectResponse } from "../response.js";
export class ProjectUpdateController {
    async update(projectId, body) {
        return await this.scenario.updateProject(projectId, body);
    }
    constructor(logger, scenario){
        this.logger = logger;
        this.scenario = scenario;
        this.logger.setContext(ProjectUpdateController.name);
    }
}
_ts_decorate([
    Patch(':projectId'),
    ApiConsumes('application/json'),
    ApiOperation({
        description: 'Update Project'
    }),
    ApiOkResponse({
        type: ProjectResponse
    }),
    ApiNotFoundResponse({
        description: '案件が見つからない'
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
    _ts_param(0, Param('projectId')),
    _ts_param(1, Body()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof ProjectUpdateRequest === "undefined" ? Object : ProjectUpdateRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], ProjectUpdateController.prototype, "update", null);
ProjectUpdateController = _ts_decorate([
    ApiTags('Projects'),
    Controller('projects'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CustomLogger === "undefined" ? Object : CustomLogger,
        typeof ProjectScenario === "undefined" ? Object : ProjectScenario
    ])
], ProjectUpdateController);

//# sourceMappingURL=update.controller.js.map