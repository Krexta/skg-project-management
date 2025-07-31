import { BadRequestException } from "@nestjs/common";
import { format } from "date-fns";
import { Address, Image, Member, Project, ProjectContractStatus, ProjectWorkStatus } from "../../../domain/entity/index.js";
import { AddressValue, ConstructionType, ContractorId, ContractStatus, ContractType, CreatedUserId, CustomerId, DatetimeValue, ImageId, ImagePath, Material, MemberId, PostalCode, ProjectAddressId, ProjectBindId, ProjectBudget, ProjectContractStatusId, ProjectDescription, ProjectId, ProjectName, ProjectStopFlag, ProjectWorkStatusId, Province, Scale, StatusReason, TotalManWork, WorkStatus, WorkType, YEAR_MONTH_DAY_FORMAT, YearMonthDay } from "../../../domain/value/index.js";
export class ProjectParser {
    returnValueOrUndefined(value, operation) {
        return value || value === '' ? operation(value) : undefined;
    }
    convertToProjectEntity(input) {
        try {
            const now = format(new Date(), YEAR_MONTH_DAY_FORMAT);
            const projectId = ProjectId.make();
            const projectName = ProjectName.from(input.project_name);
            const constructionStart = YearMonthDay.from(input.construction_start ?? now);
            const constructionStop = YearMonthDay.from(input.construction_stop ?? now);
            const budget = ProjectBudget.from(input.budget);
            const description = ProjectDescription.from(input.description);
            const customerId = CustomerId.from(input.customer_id);
            const contractorId = ContractorId.from(input.contractor_id);
            const scale = Scale.from(input.construction_scale);
            const totalManWorks = TotalManWork.from(input.total_man_works);
            const contractType = ContractType.from(input.contract_type);
            const projectType = WorkType.from(input.project_type);
            const createdUserId = CreatedUserId.make();
            const member = new Member({
                projectBindId: ProjectBindId.make(),
                projectId,
                projectMemberId: MemberId.from(input.project_member_id)
            });
            const projectMaterials = input.materials.map((val)=>Material.from(val));
            const projectConstructionTypes = input.construction_types.map((val)=>ConstructionType.from(val));
            const image = input?.image_url ? new Image({
                imageId: ImageId.make(),
                imagePath: ImagePath.from(input.image_url),
                projectId,
                createdUserId
            }) : null;
            const contractStatus = new ProjectContractStatus({
                projectContractStatusId: ProjectContractStatusId.make(),
                isProjectStop: ProjectStopFlag.from(false),
                projectId,
                statusName: ContractStatus.makeNewStatus(),
                statusReason: StatusReason.from(ContractStatus.makeNewStatus().value),
                statusTimestamp: DatetimeValue.current()
            });
            const workStatusName = input.project_work_status_name ? WorkStatus.from(input.project_work_status_name) : WorkStatus.makeNotStartedStatus();
            const workStatus = new ProjectWorkStatus({
                projectWorkStatusId: ProjectWorkStatusId.make(),
                isProjectStop: ProjectStopFlag.from(false),
                projectId,
                statusName: workStatusName,
                statusReason: StatusReason.from(workStatusName.value),
                statusTimestamp: DatetimeValue.current()
            });
            const address = new Address({
                projectAddressId: ProjectAddressId.make(),
                projectId,
                projectPostalCode: PostalCode.from(input.project_postal_code),
                projectProvince: Province.from(input.project_province),
                projectAddress: AddressValue.from(input.project_address)
            });
            return new Project({
                projectId,
                projectName,
                constructionStart,
                constructionStop,
                customerId,
                contractorId,
                scale,
                contractType,
                projectType,
                budget,
                description,
                totalManWorks,
                createdUserId,
                member,
                image,
                projectMaterials,
                projectConstructionTypes,
                contractStatus,
                workStatus,
                address
            });
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(error.message);
        }
    }
    formatDataUpdateProject(input) {
        const projectType = this.returnValueOrUndefined(input.project_type, WorkType.from);
        const projectName = this.returnValueOrUndefined(input.project_name, ProjectName.from);
        const constructionStart = this.returnValueOrUndefined(input.construction_start, YearMonthDay.from);
        const constructionStop = this.returnValueOrUndefined(input.construction_stop, YearMonthDay.from);
        const customerId = this.returnValueOrUndefined(input.customer_id, CustomerId.from);
        const contractorId = this.returnValueOrUndefined(input.contractor_id, ContractorId.from);
        const scale = this.returnValueOrUndefined(input.construction_scale, Scale.from);
        const contractType = this.returnValueOrUndefined(input.contract_type, ContractType.from);
        const createdUserId = CreatedUserId.make();
        const budget = this.returnValueOrUndefined(input.budget, ProjectBudget.from);
        const description = this.returnValueOrUndefined(input.description, ProjectDescription.from);
        const projectPostalCode = this.returnValueOrUndefined(input.project_postal_code, PostalCode.from);
        const projectProvince = this.returnValueOrUndefined(input.project_province, Province.from);
        const projectAddress = this.returnValueOrUndefined(input.project_address, AddressValue.from);
        const totalManWorks = this.returnValueOrUndefined(input.total_man_works, TotalManWork.from);
        const memberId = this.returnValueOrUndefined(input.project_member_id, MemberId.from);
        const imagePath = this.returnValueOrUndefined(input?.image_url, ImagePath.from);
        const workStatusName = this.returnValueOrUndefined(input?.project_work_status_name, WorkStatus.from);
        const workStatusReason = this.returnValueOrUndefined(input?.project_work_status_reason, StatusReason.from);
        const contractStatusName = this.returnValueOrUndefined(input?.project_contract_status_name, ContractStatus.from);
        const contractStatusReason = this.returnValueOrUndefined(input?.project_contract_status_reason, StatusReason.from);
        const projectMaterials = input.materials?.map((id)=>Material.from(id));
        const projectConstructionTypes = input.construction_types?.map((item)=>ConstructionType.from(item));
        return {
            projectType,
            projectName,
            constructionStart,
            constructionStop,
            customerId,
            contractorId,
            scale,
            contractType,
            createdUserId,
            budget,
            description,
            projectPostalCode,
            projectProvince,
            projectAddress,
            totalManWorks,
            memberId,
            imagePath,
            projectMaterials,
            projectConstructionTypes,
            workStatusName,
            workStatusReason,
            contractStatusName,
            contractStatusReason
        };
    }
    convertToReference(result) {
        return {
            project_id: result.projectId.value,
            project_name: result.projectName.value,
            construction_start: result.constructionStart.toDate(),
            construction_stop: result.constructionStop.toDate(),
            budget: result.budget.toValue() ?? undefined,
            description: result.description.value,
            customer_id: result.customerId.value,
            contractor_id: result.contractorId.value,
            construction_scale: result.scale.toValue() ?? undefined,
            project_type: result.projectType.value,
            contract_type: result.contractType.value,
            address: result.address ? {
                project_address_id: result.address.projectAddressId.value,
                project_id: result.address.projectId.value,
                project_postal_code: result.address.projectPostalCode.value,
                project_province: result.address.projectProvince.value,
                project_address: result.address.projectAddress.value
            } : undefined,
            total_man_works: result.totalManWorks.toValue() ?? undefined,
            created_user_id: result.createdUserId.value,
            project_member: {
                project_bind_id: result.member.projectBindId.value,
                project_id: result.member.projectId.value,
                project_member_id: result.member.projectMemberId.value
            },
            materials: result.projectMaterials.map((material)=>material.value),
            construction_types: result.projectConstructionTypes.map((type)=>type.value),
            image_url: result?.image?.imagePath?.value ?? undefined,
            contract_status: {
                project_contract_status_id: result.contractStatus.projectContractStatusId.value,
                is_project_stop: result.contractStatus.isProjectStop.value,
                project_id: result.contractStatus.projectId.value,
                status_name: result.contractStatus.statusName.value,
                status_reason: result.contractStatus.statusReason.value,
                status_timestamp: result.contractStatus.statusTimestamp.toString()
            },
            work_status: {
                project_work_status_id: result.workStatus.projectWorkStatusId.value,
                is_project_stop: result.workStatus.isProjectStop.value,
                project_id: result.workStatus.projectId.value,
                status_name: result.workStatus.statusName.value,
                status_reason: result.workStatus.statusReason.value,
                status_timestamp: result.workStatus.statusTimestamp.toString()
            }
        };
    }
    constructor(logger){
        this.logger = logger;
    }
}

//# sourceMappingURL=parser.js.map