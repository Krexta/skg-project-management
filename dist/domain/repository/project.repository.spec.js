import { Test } from "@nestjs/testing";
import { format } from "date-fns";
import fc from "fast-check";
import { afterAll, assert, beforeAll, describe, expect, it, vi } from "vitest";
import { ProjectTable } from "../../infrastructure/persistence/project/index.js";
import { PrismaService } from "../../infrastructure/service/index.js";
import { PrismaModule } from "../../module/prisma.module.js";
import { UtilityModule } from "../../module/utility.module.js";
import { Address, Image, Member, Project, ProjectContractStatus, ProjectWorkStatus } from "../entity/index.js";
import { AddressValue, CONSTRUCTION_TYPE_LIST, ConstructionType, CONTRACT_TYPE_LIST, ContractorId, ContractStatus, ContractType, CreatedUserId, CustomerId, DatetimeValue, ImageId, ImagePath, Material, MATERIAL_LIST, MemberId, PostalCode, ProjectAddressId, ProjectBindId, ProjectBudget, ProjectContractStatusId, ProjectDescription, ProjectId, ProjectName, ProjectStopFlag, ProjectWorkStatusId, Province, Scale, StatusReason, TotalManWork, WORK_TYPE_LIST, WorkStatus, WorkType, YEAR_MONTH_DAY_FORMAT, YearMonthDay } from "../value/index.js";
export function createProjectProperty() {
    return fc.record({
        projectId: fc.uuid({
            version: 7
        }),
        projectType: fc.constantFrom(...WORK_TYPE_LIST),
        projectName: fc.string({
            minLength: 1,
            maxLength: 256
        }).filter((val)=>val.trim().length > 1 && val.trim().length <= 256),
        constructionStart: fc.date({
            min: new Date(0),
            max: new Date(9999, 11, 31)
        }),
        constructionStop: fc.date({
            min: new Date(0),
            max: new Date(9999, 11, 31)
        }),
        customerId: fc.uuid({
            version: 7
        }),
        contractorId: fc.uuid({
            version: 7
        }),
        member: fc.record({
            bindId: fc.uuid({
                version: 7
            }),
            memberId: fc.uuid({
                version: 7
            })
        }),
        contractType: fc.constantFrom(...CONTRACT_TYPE_LIST),
        createdUserId: fc.uuid({
            version: 7
        }),
        budget: fc.stringMatching(/^\d{1,61}(\.\d{1,3})?$/),
        description: fc.string(),
        scale: fc.stringMatching(/^\d{1,14}(\.\d)?$/),
        address: fc.record({
            addressId: fc.uuid({
                version: 7
            }),
            postalCode: fc.string({
                minLength: 7,
                maxLength: 7
            }).filter((val)=>val.trim().length === 7),
            province: fc.string({
                minLength: 1,
                maxLength: 256
            }).filter((val)=>val.trim().length > 1 && val.trim().length <= 256),
            address: fc.string({
                minLength: 1,
                maxLength: 256
            }).filter((val)=>val.trim().length > 1 && val.trim().length <= 256)
        }),
        totalManWorks: fc.stringMatching(/^\d{1,8}(\.\d{1,2})?$/),
        image: fc.record({
            imageId: fc.uuid({
                version: 7
            }),
            imagePath: fc.stringMatching(/(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/)
        }),
        projectMaterials: fc.subarray([
            ...MATERIAL_LIST
        ], {
            minLength: 1
        }),
        projectConstructionTypes: fc.subarray([
            ...CONSTRUCTION_TYPE_LIST
        ], {
            minLength: 1
        }),
        workStatus: fc.record({
            projectWorkStatusId: fc.uuid({
                version: 7
            }),
            isProjectStop: fc.boolean(),
            projectStatusSeqMasterId: fc.uuid({
                version: 7
            }),
            statusName: fc.string({
                minLength: 1,
                maxLength: 45
            }).filter((val)=>val.trim().length > 1 && val.trim().length <= 45),
            statusReason: fc.string({
                minLength: 1
            }).filter((val)=>val.trim().length > 1),
            statusTimestamp: fc.date({
                min: new Date(0),
                max: new Date(9999, 11, 31)
            })
        }),
        contractStatus: fc.record({
            projectContractStatusId: fc.uuid({
                version: 7
            }),
            isProjectStop: fc.boolean(),
            projectContractStatusSeqMasterId: fc.uuid({
                version: 7
            }),
            statusName: fc.string({
                minLength: 1,
                maxLength: 45
            }).filter((val)=>val.trim().length > 1 && val.trim().length <= 45),
            statusReason: fc.string({
                minLength: 1
            }).filter((val)=>val.trim().length > 1),
            statusTimestamp: fc.date({
                min: new Date(0),
                max: new Date(9999, 11, 31)
            })
        })
    }).map(({ projectId, projectType, projectName, constructionStart, constructionStop, customerId, contractorId, contractType, createdUserId, budget, description, address, totalManWorks, member, image, projectMaterials, projectConstructionTypes, scale, workStatus, contractStatus })=>{
        return {
            projectId: ProjectId.from(projectId),
            projectType: WorkType.from(projectType),
            projectName: ProjectName.from(projectName),
            constructionStart: YearMonthDay.from(format(constructionStart, YEAR_MONTH_DAY_FORMAT)),
            constructionStop: YearMonthDay.from(format(constructionStop, YEAR_MONTH_DAY_FORMAT)),
            customerId: CustomerId.from(customerId),
            contractorId: ContractorId.from(contractorId),
            contractType: ContractType.from(contractType),
            createdUserId: CreatedUserId.from(createdUserId),
            description: ProjectDescription.from(description),
            address: new Address({
                projectAddressId: ProjectAddressId.from(address.addressId),
                projectId: ProjectId.from(projectId),
                projectPostalCode: PostalCode.from(address.postalCode),
                projectProvince: Province.from(address.province),
                projectAddress: AddressValue.from(address.address)
            }),
            budget: ProjectBudget.from(budget),
            totalManWorks: TotalManWork.from(totalManWorks),
            scale: Scale.from(scale),
            member: new Member({
                projectBindId: ProjectBindId.from(member.bindId),
                projectMemberId: MemberId.from(member.memberId),
                projectId: ProjectId.from(projectId)
            }),
            image: new Image({
                imageId: ImageId.from(image.imageId),
                imagePath: ImagePath.from(image.imagePath),
                projectId: ProjectId.from(projectId),
                createdUserId: CreatedUserId.from(createdUserId)
            }),
            projectMaterials: projectMaterials.map((val)=>Material.from(val)),
            projectConstructionTypes: projectConstructionTypes.map((val)=>ConstructionType.from(val)),
            workStatus: new ProjectWorkStatus({
                projectWorkStatusId: ProjectWorkStatusId.from(workStatus.projectWorkStatusId),
                isProjectStop: ProjectStopFlag.from(workStatus.isProjectStop),
                projectId: ProjectId.from(projectId),
                statusName: WorkStatus.makeNotStartedStatus(),
                statusReason: StatusReason.from(workStatus.statusReason),
                statusTimestamp: DatetimeValue.current()
            }),
            contractStatus: new ProjectContractStatus({
                projectContractStatusId: ProjectContractStatusId.from(contractStatus.projectContractStatusId),
                isProjectStop: ProjectStopFlag.from(contractStatus.isProjectStop),
                projectId: ProjectId.from(projectId),
                statusName: ContractStatus.makeNewStatus(),
                statusReason: StatusReason.from(contractStatus.statusReason),
                statusTimestamp: DatetimeValue.current()
            })
        };
    });
}
import { ProjectRepository } from "./project.repository.js";
const OPTION_UPDATE_FIELDS = [
    'projectType',
    'projectName',
    'constructionStart',
    'constructionStop',
    'customerId',
    'contractorId',
    'scale',
    'contractType',
    'createdUserId',
    'budget',
    'description',
    'projectPostalCode',
    'projectProvince',
    'projectAddress',
    'totalManWorks',
    'memberId',
    'imagePath',
    'projectMaterials',
    'projectConstructionTypes'
];
function omitRequestBody(reqBody, skipFields) {
    for (const field of skipFields){
        delete reqBody[field];
    }
    return reqBody;
}
describe('ProjectRepository', ()=>{
    let repository;
    let prisma;
    beforeAll(async ()=>{
        vi.stubEnv('DATABASE_URL', process.env.DATABASE_URL_TEST ?? 'NotFound');
        const module = await Test.createTestingModule({
            imports: [
                UtilityModule,
                PrismaModule
            ],
            providers: [
                {
                    provide: ProjectRepository,
                    useClass: ProjectTable
                }
            ]
        }).compile();
        repository = module.get(ProjectRepository);
        prisma = await module.resolve(PrismaService);
        await prisma.project.deleteMany();
    });
    afterAll(async ()=>{
        vi.unstubAllEnvs();
    });
    describe('pushProject', ()=>{
        it('should create project success when input is valid', async ()=>{
            await fc.assert(fc.asyncProperty(createProjectProperty(), async (args)=>{
                const entity = new Project(args);
                // Act
                const result = await repository.pushProject(entity);
                // Assert
                expect(result).toBeInstanceOf(Project);
                expect(result.projectId.equals(args.projectId)).toBe(true);
                expect(result.projectType.equals(args.projectType)).toBe(true);
                expect(result.contractType.equals(args.contractType)).toBe(true);
                expect(result.projectMaterials.map((item)=>item.value)).toEqual(expect.arrayContaining(args.projectMaterials.map((item)=>item.value)));
                expect(result.projectConstructionTypes.map((item)=>item.value)).toEqual(expect.arrayContaining(args.projectConstructionTypes.map((item)=>item.value)));
                expect(result.workStatus.statusName.equals(args.workStatus.statusName)).toBe(true);
                expect(result.contractStatus.statusName.equals(args.contractStatus.statusName)).toBe(true);
                assert.isNotNull(await prisma.project.findFirst({
                    where: {
                        projectId: result.projectId.value
                    }
                }));
                await prisma.project.delete({
                    where: {
                        projectId: result.projectId.value
                    }
                });
            }));
        });
    });
    describe('update', ()=>{
        it('should update project success when input is valid', async ()=>{
            await fc.assert(fc.asyncProperty(fc.record({
                toCreate: createProjectProperty(),
                toUpdate: createProjectProperty(),
                skipFields: fc.subarray(OPTION_UPDATE_FIELDS, {
                    minLength: 1
                })
            }).map(({ toCreate, toUpdate, skipFields })=>({
                    toCreate,
                    toUpdate: {
                        ...omitRequestBody(toUpdate, skipFields),
                        workStatusName: toUpdate.workStatus.statusName,
                        workStatusReason: toUpdate.workStatus.statusReason,
                        contractStatusName: toUpdate.contractStatus.statusName,
                        contractStatusReason: toUpdate.contractStatus.statusReason
                    }
                })), async ({ toCreate, toUpdate })=>{
                const entity = new Project(toCreate);
                // Act
                const project = await repository.pushProject(entity);
                const updateData = project.update(toUpdate);
                const result = await repository.update(updateData);
                // Assert
                expect(result).toBeInstanceOf(Project);
                expect(result.projectId.equals(toCreate.projectId));
                expect(result.projectType.value).equals(toUpdate.projectType?.value ?? project.projectType.value);
                expect(result.contractType.value).equals(toUpdate.contractType?.value ?? project.contractType.value);
                expect(result.projectMaterials.map((id)=>id.value)).toEqual(expect.arrayContaining((toUpdate.projectMaterials ?? project.projectMaterials).map((id)=>id.value)));
                expect(result.projectConstructionTypes.map((id)=>id.value)).toEqual(expect.arrayContaining((toUpdate.projectConstructionTypes ?? project.projectConstructionTypes).map((id)=>id.value)));
                if (toUpdate.workStatusName && toUpdate.workStatusReason) {
                    expect(result.workStatus.statusName.equals(toUpdate.workStatusName)).toBe(true);
                    expect(result.workStatus.statusReason.equals(toUpdate.workStatusReason)).toBe(true);
                } else {
                    expect(result.workStatus.statusName.equals(project.workStatus.statusName)).toBe(true);
                    expect(result.workStatus.statusReason.equals(project.workStatus.statusReason)).toBe(true);
                }
                if (toUpdate.contractStatusName && toUpdate.contractStatusReason) {
                    expect(result.contractStatus.statusName.equals(toUpdate.contractStatusName)).toBe(true);
                    expect(result.contractStatus.statusReason.equals(toUpdate.contractStatusReason)).toBe(true);
                } else {
                    expect(result.contractStatus.statusName.equals(project.contractStatus.statusName)).toBe(true);
                    expect(result.contractStatus.statusReason.equals(project.contractStatus.statusReason)).toBe(true);
                }
            }));
        });
        it('should throw error when input not exist project id - update', async ()=>{
            await fc.assert(fc.asyncProperty(fc.record({
                data: createProjectProperty()
            }), async ({ data })=>{
                const entity = new Project(data);
                const dataUpdate = entity.update(entity);
                expect(async ()=>{
                    await repository.update(dataUpdate);
                }).rejects.toThrowError(/Invalid `this.prisma.project.update\(\)` invocation in/);
            }));
        });
    });
});

//# sourceMappingURL=project.repository.spec.js.map