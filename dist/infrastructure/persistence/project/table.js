function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
import { BadGatewayException, BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ProjectConstructionTypeId, ProjectMaterialId } from "../../../domain/value/index.js";
import { CustomLogger } from "../../../utility/index.js";
import { PrismaService } from "../../service/index.js";
import { ProjectParser } from "./parser.js";
export class ProjectTable {
    async pushProject(project) {
        const budget = project.budget.toValue();
        const totalManWorks = project.totalManWorks.toValue();
        const scale = project.scale.toValue();
        const result = await this.prisma.handleError(()=>{
            const projectData = {
                projectId: project.projectId.value,
                projectWorkType: project.projectType.value,
                projectName: project.projectName.value,
                constructionStart: project.constructionStart.toDate(),
                constructionStop: project.constructionStop.toDate(),
                budget: budget ? new Prisma.Decimal(budget) : null,
                description: project.description.value,
                customerId: project.customerId.value,
                projectContractType: project.contractType.value,
                totalManWorks: totalManWorks ? new Prisma.Decimal(totalManWorks) : null,
                createdUserId: project.createdUserId.value,
                contractorId: project.contractorId.value,
                scale: scale ? new Prisma.Decimal(scale) : null,
                projectMember: {
                    create: {
                        projectBindId: project.member.projectBindId.value,
                        projectMemberId: project.member.projectMemberId.value
                    }
                },
                projectMaterial: {
                    createMany: {
                        data: project.projectMaterials.map((val)=>{
                            return {
                                projectMaterialId: ProjectMaterialId.make().value,
                                materialType: val.value
                            };
                        }),
                        skipDuplicates: true
                    }
                },
                projectConstructionType: {
                    createMany: {
                        data: project.projectConstructionTypes.map((val)=>{
                            return {
                                projectConstructionTypeId: ProjectConstructionTypeId.make().value,
                                constructionType: val.value
                            };
                        }),
                        skipDuplicates: true
                    }
                },
                projectContractStatus: {
                    create: {
                        projectContractStatusId: project.contractStatus.projectContractStatusId.value,
                        statusName: project.contractStatus.statusName.value,
                        statusReason: project.contractStatus.statusReason.value,
                        isProjectStop: project.contractStatus.isProjectStop.value,
                        statusTimestamp: project.contractStatus.statusTimestamp.toDate()
                    }
                },
                projectWorkStatus: {
                    create: {
                        projectWorkStatusId: project.workStatus.projectWorkStatusId.value,
                        statusName: project.workStatus.statusName.value,
                        statusReason: project.workStatus.statusReason.value,
                        isProjectStop: project.workStatus.isProjectStop.value,
                        statusTimestamp: project.workStatus.statusTimestamp.toDate()
                    }
                }
            };
            if (project.image?.imagePath.value) {
                projectData.image = {
                    create: {
                        imageId: project.image.imageId.value,
                        imagePath: project.image.imagePath.value,
                        createdUserId: project.image.createdUserId.value
                    }
                };
            }
            if (project.address) {
                projectData.projectAddress = {
                    create: {
                        projectAddressId: project.address.projectAddressId.value,
                        projectPostalCode: project.address.projectPostalCode.value,
                        projectProvince: project.address.projectProvince.value,
                        projectAddress: project.address.projectAddress.value
                    }
                };
            }
            return this.prisma.project.create({
                data: projectData,
                select: this.projectInclude
            });
        });
        return this.parser.convertToProjectEntity(result);
    }
    async getById(projectId) {
        try {
            const result = await this.prisma.project.findFirst({
                where: {
                    projectId: projectId.value
                },
                select: this.projectInclude
            });
            return result ? this.parser.convertToProjectEntity(result) : null;
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
    async update(project) {
        const result = await this.prisma.handleError(()=>{
            const budget = project.budget?.toValue();
            const totalManWorks = project.totalManWorks?.toValue();
            const scale = project.scale?.toValue();
            const data = {
                projectId: project.projectId.value,
                projectName: project.projectName?.value,
                constructionStart: project.constructionStart?.toDate(),
                constructionStop: project.constructionStop?.toDate(),
                budget: budget ? new Prisma.Decimal(budget) : undefined,
                description: project.description?.value,
                customerId: project.customerId?.value,
                totalManWorks: totalManWorks ? new Prisma.Decimal(totalManWorks) : undefined,
                createdUserId: project.createdUserId?.value,
                contractorId: project.contractorId?.value,
                scale: scale ? new Prisma.Decimal(scale) : undefined,
                projectContractType: project.contractType?.value,
                projectWorkType: project.projectType?.value
            };
            if (project.projectMaterials) {
                data['projectMaterial'] = {
                    deleteMany: {},
                    createMany: {
                        data: project.projectMaterials.map((val)=>{
                            return {
                                projectMaterialId: ProjectMaterialId.make().value,
                                materialType: val.value
                            };
                        }),
                        skipDuplicates: true
                    }
                };
            }
            if (project.projectConstructionTypes) {
                data['projectConstructionType'] = {
                    deleteMany: {},
                    createMany: {
                        data: project.projectConstructionTypes.map((val)=>{
                            return {
                                projectConstructionTypeId: ProjectConstructionTypeId.make().value,
                                constructionType: val.value
                            };
                        }),
                        skipDuplicates: true
                    }
                };
            }
            if (project.member) {
                data['projectMember'] = {
                    create: {
                        projectBindId: project.member.projectBindId.value,
                        projectMemberId: project.member.projectMemberId.value
                    }
                };
            }
            if (project.image && project.image?.imagePath.value) {
                data['image'] = {
                    create: {
                        imageId: project.image.imageId.value,
                        imagePath: project.image.imagePath.value,
                        createdUserId: project.image.createdUserId.value
                    }
                };
            }
            if (project.address && project.address) {
                data['projectAddress'] = {
                    update: {
                        where: {
                            projectAddressId: project.address.projectAddressId.value
                        },
                        data: {
                            projectAddressId: project.address.projectAddressId.value,
                            projectPostalCode: project.address.projectPostalCode?.value,
                            projectProvince: project.address.projectProvince?.value,
                            projectAddress: project.address.projectAddress?.value
                        }
                    }
                };
            }
            if (project.contractStatus) {
                data['projectContractStatus'] = {
                    create: {
                        projectContractStatusId: project.contractStatus.projectContractStatusId.value,
                        statusName: project.contractStatus.statusName.value,
                        statusReason: project.contractStatus.statusReason.value,
                        isProjectStop: project.contractStatus.isProjectStop.value
                    }
                };
            }
            if (project.workStatus) {
                data['projectWorkStatus'] = {
                    create: {
                        projectWorkStatusId: project.workStatus.projectWorkStatusId.value,
                        statusName: project.workStatus.statusName.value,
                        statusReason: project.workStatus.statusReason.value,
                        isProjectStop: project.workStatus.isProjectStop.value
                    }
                };
            }
            return this.prisma.project.update({
                where: {
                    projectId: project.projectId.value
                },
                data,
                select: this.projectInclude
            });
        });
        return this.parser.convertToProjectEntity(result);
    }
    constructor(logger, prisma){
        this.logger = logger;
        this.prisma = prisma;
        this.projectSelect = {
            projectId: true,
            projectName: true,
            constructionStart: true,
            constructionStop: true,
            customerId: true,
            contractorId: true,
            scale: true,
            createdUserId: true,
            budget: true,
            description: true,
            totalManWorks: true,
            projectWorkType: true,
            projectContractType: true,
            projectAddress: true,
            projectMember: {
                orderBy: {
                    createdAt: 'desc'
                },
                take: 1
            },
            image: {
                orderBy: {
                    createdAt: 'desc'
                },
                take: 1
            },
            projectContractStatus: {
                orderBy: {
                    statusTimestamp: 'desc'
                },
                take: 1
            },
            projectWorkStatus: {
                orderBy: {
                    statusTimestamp: 'desc'
                },
                take: 1
            }
        };
        this.selectRelationShip = {
            projectMaterial: true,
            projectConstructionType: true
        };
        this.projectInclude = {
            ...this.projectSelect,
            ...this.selectRelationShip
        };
        this.logger.setContext(ProjectTable.name);
        this.prisma.setLoggerContext(ProjectTable.name);
        this.parser = new ProjectParser(this.logger);
    }
}
ProjectTable = _ts_decorate([
    Injectable(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CustomLogger === "undefined" ? Object : CustomLogger,
        typeof PrismaService === "undefined" ? Object : PrismaService
    ])
], ProjectTable);

//# sourceMappingURL=table.js.map