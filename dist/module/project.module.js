function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
import { Module } from "@nestjs/common";
import { ProjectScenario } from "../application/scenario/project/index.js";
import { ProjectRepository } from "../domain/repository/index.js";
import { ProjectTable } from "../infrastructure/persistence/project/index.js";
import { ProjectCreateController, ProjectUpdateController } from "../presentation/project/controller/index.js";
import { PrismaModule } from "./prisma.module.js";
import { UtilityModule } from "./utility.module.js";
export class ProjectModule {
}
ProjectModule = _ts_decorate([
    Module({
        imports: [
            UtilityModule,
            PrismaModule
        ],
        providers: [
            ProjectScenario,
            {
                provide: ProjectRepository,
                useClass: ProjectTable
            }
        ],
        controllers: [
            ProjectCreateController,
            ProjectUpdateController
        ]
    })
], ProjectModule);

//# sourceMappingURL=project.module.js.map