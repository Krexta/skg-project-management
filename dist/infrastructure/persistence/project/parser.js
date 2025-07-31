import { format } from "date-fns";
import { Address, Image as ImageEntity, Member, Project, ProjectContractStatus as ProjectContractStatusEntity, ProjectWorkStatus as ProjectWorkStatusEntity } from "../../../domain/entity/index.js";
import { AddressValue, ConstructionType, ContractorId, ContractStatus, ContractType, CreatedUserId, CustomerId, DATETIME_VALUE_FORMAT, DatetimeValue, ImageId, ImagePath, Material, MemberId, PostalCode, ProjectAddressId, ProjectBindId, ProjectBudget, ProjectContractStatusId, ProjectDescription, ProjectId, ProjectName, ProjectStopFlag, ProjectWorkStatusId, Province, Scale, StatusReason, TotalManWork, WorkStatus, WorkType, YEAR_MONTH_DAY_FORMAT, YearMonthDay } from "../../../domain/value/index.js";
export class ProjectParser {
    convertToProjectEntity(record) {
        const image = record.image[0];
        const contractStatus = record.projectContractStatus[0];
        const workStatus = record.projectWorkStatus[0];
        const member = record.projectMember[0];
        return new Project({
            projectId: ProjectId.from(record.projectId),
            projectType: WorkType.from(record.projectWorkType),
            projectName: ProjectName.from(record.projectName),
            constructionStart: YearMonthDay.from(format(record.constructionStart, YEAR_MONTH_DAY_FORMAT)),
            constructionStop: YearMonthDay.from(format(record.constructionStop, YEAR_MONTH_DAY_FORMAT)),
            customerId: CustomerId.from(record.customerId),
            contractorId: ContractorId.from(record.contractorId),
            scale: Scale.from(record.scale?.toString() ?? null),
            contractType: ContractType.from(record.projectContractType),
            createdUserId: CreatedUserId.from(record.createdUserId),
            budget: ProjectBudget.from(record.budget?.toString() ?? null),
            description: ProjectDescription.from(record.description),
            address: record.projectAddress ? new Address({
                projectAddressId: ProjectAddressId.from(record.projectAddress.projectAddressId),
                projectId: ProjectId.from(record.projectAddress.projectId),
                projectPostalCode: PostalCode.from(record.projectAddress.projectPostalCode),
                projectProvince: Province.from(record.projectAddress.projectProvince),
                projectAddress: AddressValue.from(record.projectAddress.projectAddress)
            }) : null,
            totalManWorks: TotalManWork.from(record.totalManWorks?.toString() ?? null),
            member: new Member({
                projectBindId: ProjectBindId.from(member.projectBindId),
                projectId: ProjectId.from(member.projectId),
                projectMemberId: MemberId.from(member.projectMemberId)
            }),
            image: new ImageEntity({
                imageId: image?.imageId ? ImageId.from(image.imageId) : ImageId.make(),
                projectId: ProjectId.from(record.projectId),
                createdUserId: image?.createdUserId ? CreatedUserId.from(image.createdUserId) : CreatedUserId.from(record.createdUserId),
                imagePath: ImagePath.from(image?.imagePath ?? null)
            }),
            projectMaterials: record.projectMaterial.map((data)=>Material.from(data.materialType)),
            projectConstructionTypes: record.projectConstructionType.map((data)=>ConstructionType.from(data.constructionType)),
            contractStatus: new ProjectContractStatusEntity({
                projectContractStatusId: ProjectContractStatusId.from(contractStatus.projectContractStatusId),
                isProjectStop: ProjectStopFlag.from(contractStatus.isProjectStop),
                projectId: ProjectId.from(contractStatus.projectId),
                statusName: ContractStatus.from(contractStatus.statusName),
                statusReason: StatusReason.from(contractStatus.statusReason),
                statusTimestamp: DatetimeValue.from(format(contractStatus.statusTimestamp, DATETIME_VALUE_FORMAT))
            }),
            workStatus: new ProjectWorkStatusEntity({
                projectWorkStatusId: ProjectWorkStatusId.from(workStatus.projectWorkStatusId),
                isProjectStop: ProjectStopFlag.from(workStatus.isProjectStop),
                projectId: ProjectId.from(workStatus.projectId),
                statusName: WorkStatus.from(workStatus.statusName),
                statusReason: StatusReason.from(workStatus.statusReason),
                statusTimestamp: DatetimeValue.from(format(workStatus.statusTimestamp, DATETIME_VALUE_FORMAT))
            })
        });
    }
    constructor(logger){
        this.logger = logger;
    }
}

//# sourceMappingURL=parser.js.map