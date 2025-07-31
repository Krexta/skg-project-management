import { DatetimeValue, ImageId, ProjectBindId, ProjectContractStatusId, ProjectStopFlag, ProjectWorkStatusId, WorkStatus } from "../value/index.js";
import { Image, Member, ProjectContractStatus, ProjectWorkStatus } from "./index.js";
export class UpdatedProject {
    constructor(args){
        this.projectId = args.projectId;
        this.projectType = args.projectType;
        this.projectName = args.projectName;
        this.constructionStart = args.constructionStart;
        this.constructionStop = args.constructionStop;
        this.customerId = args.customerId;
        this.contractorId = args.contractorId;
        this.scale = args.scale;
        this.contractType = args.contractType;
        this.createdUserId = args.createdUserId;
        this.budget = args.budget;
        this.description = args.description;
        this.address = args.address;
        this.totalManWorks = args.totalManWorks;
        this.member = args.member;
        this.projectMaterials = args.projectMaterials;
        this.projectConstructionTypes = args.projectConstructionTypes;
        this.image = args.image;
        this.contractStatus = args.contractStatus;
        this.workStatus = args.workStatus;
    }
}
export class Project {
    get projectId() {
        return this._projectId;
    }
    get projectType() {
        return this._projectType;
    }
    get projectName() {
        return this._projectName;
    }
    get constructionStart() {
        return this._constructionStart;
    }
    get constructionStop() {
        return this._constructionStop;
    }
    get customerId() {
        return this._customerId;
    }
    get contractorId() {
        return this._contractorId;
    }
    get scale() {
        return this._scale;
    }
    get contractType() {
        return this._contractType;
    }
    get createdUserId() {
        return this._createdUserId;
    }
    get budget() {
        return this._budget;
    }
    get description() {
        return this._description;
    }
    get address() {
        return this._address;
    }
    get totalManWorks() {
        return this._totalManWorks;
    }
    get member() {
        return this._member;
    }
    get projectMaterials() {
        return this._projectMaterials;
    }
    get projectConstructionTypes() {
        return this._projectConstructionTypes;
    }
    get image() {
        return this._image;
    }
    get contractStatus() {
        return this._contractStatus;
    }
    get workStatus() {
        return this._workStatus;
    }
    update(input) {
        const image = input.imagePath ? new Image({
            imageId: ImageId.make(),
            imagePath: input?.imagePath,
            projectId: this._projectId,
            createdUserId: this.createdUserId
        }) : undefined;
        // Address
        const address = this.address?.update({
            projectPostalCode: input.projectPostalCode,
            projectProvince: input.projectProvince,
            projectAddress: input.projectAddress
        });
        // projectMember
        const member = input.memberId ? new Member({
            projectBindId: ProjectBindId.make(),
            projectId: this._projectId,
            projectMemberId: input.memberId
        }) : undefined;
        // WorkStatus
        const workStatus = input.workStatusName && input.workStatusReason ? new ProjectWorkStatus({
            projectWorkStatusId: ProjectWorkStatusId.make(),
            isProjectStop: ProjectStopFlag.from(input.workStatusName.value === WorkStatus.makeDeletedStatus().value),
            projectId: this._projectId,
            statusName: input.workStatusName,
            statusReason: input.workStatusReason,
            statusTimestamp: DatetimeValue.current()
        }) : undefined;
        // ContractStatus
        const contractStatus = input.contractStatusName && input.contractStatusReason ? new ProjectContractStatus({
            projectContractStatusId: ProjectContractStatusId.make(),
            isProjectStop: ProjectStopFlag.from(false),
            projectId: this._projectId,
            statusName: input.contractStatusName,
            statusReason: input.contractStatusReason,
            statusTimestamp: DatetimeValue.current()
        }) : undefined;
        return new UpdatedProject({
            projectId: this.projectId,
            projectName: input.projectName,
            constructionStart: input.constructionStart,
            constructionStop: input.constructionStop,
            budget: input.budget,
            description: input.description,
            customerId: input.customerId,
            contractorId: input.contractorId,
            scale: input.scale,
            totalManWorks: input.totalManWorks,
            projectType: input.projectType,
            contractType: input.contractType,
            projectConstructionTypes: input.projectConstructionTypes,
            projectMaterials: input.projectMaterials,
            image,
            address,
            member,
            workStatus,
            contractStatus
        });
    }
    constructor(args){
        this._projectId = args.projectId;
        this._projectType = args.projectType;
        this._projectName = args.projectName;
        this._constructionStart = args.constructionStart;
        this._constructionStop = args.constructionStop;
        this._customerId = args.customerId;
        this._contractorId = args.contractorId;
        this._scale = args.scale;
        this._contractType = args.contractType;
        this._createdUserId = args.createdUserId;
        this._budget = args.budget;
        this._description = args.description;
        this._address = args.address;
        this._totalManWorks = args.totalManWorks;
        this._member = args.member;
        this._projectMaterials = args.projectMaterials;
        this._projectConstructionTypes = args.projectConstructionTypes;
        this._image = args.image;
        this._contractStatus = args.contractStatus;
        this._workStatus = args.workStatus;
    }
}

//# sourceMappingURL=Project.js.map