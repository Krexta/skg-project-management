import { format } from "date-fns";
import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { AddressValue, CONSTRUCTION_TYPE_LIST, ConstructionType, CONTRACT_STATUS_LIST, CONTRACT_TYPE_LIST, ContractorId, ContractStatus, ContractType, CreatedUserId, CustomerId, DATETIME_VALUE_FORMAT, DatetimeValue, ImageId, ImagePath, Material, MATERIAL_LIST, MemberId, PostalCode, ProjectAddressId, ProjectBindId, ProjectBudget, ProjectContractStatusId, ProjectDescription, ProjectId, ProjectName, ProjectStopFlag, ProjectWorkStatusId, Province, Scale, StatusReason, TotalManWork, WORK_STATUS_LIST, WORK_TYPE_LIST, WorkStatus, WorkType, YEAR_MONTH_DAY_FORMAT, YearMonthDay } from "../value/index.js";
import { Address, Image, Member, Project, ProjectContractStatus, ProjectWorkStatus } from "./index.js";
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
            projectStatusSeqId: fc.uuid({
                version: 7
            }),
            statusName: fc.constantFrom(...WORK_STATUS_LIST),
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
            projectContractStatusSeqId: fc.uuid({
                version: 7
            }),
            statusName: fc.constantFrom(...CONTRACT_STATUS_LIST),
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
                statusTimestamp: DatetimeValue.from(format(workStatus.statusTimestamp, DATETIME_VALUE_FORMAT))
            }),
            contractStatus: new ProjectContractStatus({
                projectContractStatusId: ProjectContractStatusId.from(contractStatus.projectContractStatusId),
                isProjectStop: ProjectStopFlag.from(contractStatus.isProjectStop),
                projectId: ProjectId.from(projectId),
                statusName: ContractStatus.makeNewStatus(),
                statusReason: StatusReason.from(contractStatus.statusReason),
                statusTimestamp: DatetimeValue.from(format(contractStatus.statusTimestamp, DATETIME_VALUE_FORMAT))
            })
        };
    });
}
const OPTIONAL_UPDATE_FIELDS = [
    'projectTypeId',
    'projectName',
    'constructionStart',
    'constructionStop',
    'customerId',
    'contractorId',
    'scale',
    'contractTypeId',
    'createdUserId',
    'budget',
    'description',
    'totalManWorks',
    'projectMaterials',
    'projectConstructionTypes'
];
function omitRequestUpdateBody(reqBody, skipFields) {
    for (const field of skipFields){
        delete reqBody[field];
    }
    return reqBody;
}
describe('Project', ()=>{
    it('should return project instance when input valid data', ()=>{
        fc.assert(fc.property(createProjectProperty(), (args)=>{
            const value = new Project(args);
            expect(value).toBeInstanceOf(Project);
            expect(value.projectId).toEqual(args.projectId);
            expect(value.projectType).toEqual(args.projectType);
            expect(value.projectName).toEqual(args.projectName);
            expect(value.constructionStart).toEqual(args.constructionStart);
            expect(value.constructionStop).toEqual(args.constructionStop);
            expect(value.customerId).toEqual(args.customerId);
            expect(value.contractorId).toEqual(args.contractorId);
            expect(value.contractType).toEqual(args.contractType);
            expect(value.createdUserId).toEqual(args.createdUserId);
            expect(value.description).toEqual(args.description);
            expect(value.budget).toEqual(args.budget);
            expect(value.totalManWorks).toEqual(args.totalManWorks);
            expect(value.scale).toEqual(args.scale);
            expect(value.address?.projectAddressId).toEqual(args.address?.projectAddressId);
            expect(value.address?.projectId).toEqual(args.address?.projectId);
            expect(value.address?.projectPostalCode).toEqual(args.address?.projectPostalCode);
            expect(value.address?.projectProvince).toEqual(args.address?.projectProvince);
            expect(value.address?.projectAddress).toEqual(args.address?.projectAddress);
        }));
    });
    describe('update', ()=>{
        it('should return project instance when input data to update have optional fields', ()=>{
            fc.assert(fc.property(fc.record({
                dataToCreateProject: createProjectProperty(),
                dataToUpdateProject: createProjectProperty(),
                skipFields: fc.subarray(OPTIONAL_UPDATE_FIELDS, {
                    minLength: 1
                })
            }).map(({ dataToCreateProject, dataToUpdateProject, skipFields })=>({
                    dataToCreateProject,
                    dataToUpdateProject: omitRequestUpdateBody(dataToUpdateProject, skipFields)
                })), ({ dataToCreateProject, dataToUpdateProject })=>{
                const project = new Project(dataToCreateProject);
                const dataUpdated = project.update(dataToUpdateProject);
                if (dataToUpdateProject.projectName) {
                    expect(dataUpdated.projectName?.value).toEqual(dataToUpdateProject.projectName.value);
                } else {
                    expect(project.projectName.value).toEqual(dataToCreateProject.projectName.value);
                }
                if (dataToUpdateProject.constructionStart) {
                    expect(dataUpdated.constructionStart?.value).toEqual(dataToUpdateProject.constructionStart.value);
                } else {
                    expect(project.constructionStart.value).toEqual(dataToCreateProject.constructionStart.value);
                }
                if (dataToUpdateProject.constructionStop) {
                    expect(dataUpdated.constructionStop?.value).toEqual(dataToUpdateProject.constructionStop.value);
                } else {
                    expect(project.constructionStop.value).toEqual(dataToCreateProject.constructionStop.value);
                }
                if (dataToUpdateProject.budget) {
                    expect(Number(dataUpdated.budget?.value)).toEqual(Number(dataToUpdateProject.budget.value));
                } else {
                    expect(Number(project.budget.value)).toEqual(Number(dataToCreateProject.budget.value));
                }
                if (dataToUpdateProject.description) {
                    expect(dataUpdated.description?.value).toEqual(dataToUpdateProject.description.value);
                } else {
                    expect(project.description.value).toEqual(dataToCreateProject.description.value);
                }
                if (dataToUpdateProject.customerId) {
                    expect(dataUpdated.customerId?.value).toEqual(dataToUpdateProject.customerId.value);
                } else {
                    expect(project.customerId.value).toEqual(dataToCreateProject.customerId.value);
                }
                if (dataToUpdateProject.contractorId) {
                    expect(dataUpdated.contractorId?.value).toEqual(dataToUpdateProject.contractorId.value);
                } else {
                    expect(project.contractorId.value).toEqual(dataToCreateProject.contractorId.value);
                }
                if (dataToUpdateProject.scale) {
                    expect(Number(dataUpdated.scale?.value)).toEqual(Number(dataToUpdateProject.scale.value));
                } else {
                    expect(Number(project.scale.value)).toEqual(Number(dataToCreateProject.scale.value));
                }
                if (dataToUpdateProject.totalManWorks) {
                    expect(Number(dataUpdated.totalManWorks?.value)).toEqual(Number(dataToUpdateProject.totalManWorks.value));
                } else {
                    expect(Number(project.totalManWorks.value)).toEqual(Number(dataToCreateProject.totalManWorks.value));
                }
                if (dataToUpdateProject.projectType) {
                    expect(dataUpdated.projectType?.value).toEqual(dataToUpdateProject.projectType.value);
                } else {
                    expect(project.projectType.value).toEqual(dataToCreateProject.projectType.value);
                }
                if (dataToUpdateProject.contractType) {
                    expect(dataUpdated.contractType?.value).toEqual(dataToUpdateProject.contractType.value);
                } else {
                    expect(project.contractType.value).toEqual(dataToCreateProject.contractType.value);
                }
            }));
        });
    });
});

//# sourceMappingURL=Project.spec.js.map