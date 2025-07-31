function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
import { ApiProperty } from "@nestjs/swagger";
export class Member {
}
_ts_decorate([
    ApiProperty({
        title: 'Project bind ID',
        description: 'UUIDv7'
    }),
    _ts_metadata("design:type", String)
], Member.prototype, "project_bind_id", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project ID',
        description: 'UUIDv7'
    }),
    _ts_metadata("design:type", String)
], Member.prototype, "project_id", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project_member ID'
    }),
    _ts_metadata("design:type", String)
], Member.prototype, "project_member_id", void 0);
export class ProjectAddress {
}
_ts_decorate([
    ApiProperty({
        title: 'Project address ID',
        description: 'UUIDv7'
    }),
    _ts_metadata("design:type", String)
], ProjectAddress.prototype, "project_address_id", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project ID',
        description: 'UUIDv7'
    }),
    _ts_metadata("design:type", String)
], ProjectAddress.prototype, "project_id", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project postal code'
    }),
    _ts_metadata("design:type", String)
], ProjectAddress.prototype, "project_postal_code", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project province'
    }),
    _ts_metadata("design:type", String)
], ProjectAddress.prototype, "project_province", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project address'
    }),
    _ts_metadata("design:type", String)
], ProjectAddress.prototype, "project_address", void 0);
export class ProjectContractStatus {
}
_ts_decorate([
    ApiProperty({
        title: 'Project contract status ID',
        description: 'UUIDv7'
    }),
    _ts_metadata("design:type", String)
], ProjectContractStatus.prototype, "project_contract_status_id", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Is project stop'
    }),
    _ts_metadata("design:type", Boolean)
], ProjectContractStatus.prototype, "is_project_stop", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project ID',
        description: 'UUIDv7'
    }),
    _ts_metadata("design:type", String)
], ProjectContractStatus.prototype, "project_id", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Status name'
    }),
    _ts_metadata("design:type", String)
], ProjectContractStatus.prototype, "status_name", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Status reason'
    }),
    _ts_metadata("design:type", String)
], ProjectContractStatus.prototype, "status_reason", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Status timestamp'
    }),
    _ts_metadata("design:type", String)
], ProjectContractStatus.prototype, "status_timestamp", void 0);
export class ProjectWorkStatus {
}
_ts_decorate([
    ApiProperty({
        title: 'Project work status ID',
        description: 'UUIDv7'
    }),
    _ts_metadata("design:type", String)
], ProjectWorkStatus.prototype, "project_work_status_id", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Is project stop'
    }),
    _ts_metadata("design:type", Boolean)
], ProjectWorkStatus.prototype, "is_project_stop", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project ID',
        description: 'UUIDv7'
    }),
    _ts_metadata("design:type", String)
], ProjectWorkStatus.prototype, "project_id", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Status name'
    }),
    _ts_metadata("design:type", String)
], ProjectWorkStatus.prototype, "status_name", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Status reason'
    }),
    _ts_metadata("design:type", String)
], ProjectWorkStatus.prototype, "status_reason", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Status timestamp'
    }),
    _ts_metadata("design:type", String)
], ProjectWorkStatus.prototype, "status_timestamp", void 0);
export class ProjectResponse {
}
_ts_decorate([
    ApiProperty({
        title: 'Project ID',
        description: 'UUIDv7'
    }),
    _ts_metadata("design:type", String)
], ProjectResponse.prototype, "project_id", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project name'
    }),
    _ts_metadata("design:type", String)
], ProjectResponse.prototype, "project_name", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Customer'
    }),
    _ts_metadata("design:type", String)
], ProjectResponse.prototype, "customer_id", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Contractor ID'
    }),
    _ts_metadata("design:type", String)
], ProjectResponse.prototype, "contractor_id", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project work type'
    }),
    _ts_metadata("design:type", String)
], ProjectResponse.prototype, "project_type", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project member'
    }),
    _ts_metadata("design:type", typeof Member === "undefined" ? Object : Member)
], ProjectResponse.prototype, "project_member", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Construction start',
        format: 'yyyy-MM-dd'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ProjectResponse.prototype, "construction_start", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Construction stop',
        format: 'yyyy-MM-dd'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ProjectResponse.prototype, "construction_stop", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Construction scale',
        required: false
    }),
    _ts_metadata("design:type", String)
], ProjectResponse.prototype, "construction_scale", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Budget',
        required: false
    }),
    _ts_metadata("design:type", String)
], ProjectResponse.prototype, "budget", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Address',
        required: false
    }),
    _ts_metadata("design:type", typeof ProjectAddress === "undefined" ? Object : ProjectAddress)
], ProjectResponse.prototype, "address", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Total man work',
        required: false
    }),
    _ts_metadata("design:type", String)
], ProjectResponse.prototype, "total_man_works", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project contract type'
    }),
    _ts_metadata("design:type", String)
], ProjectResponse.prototype, "contract_type", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project construction types'
    }),
    _ts_metadata("design:type", Array)
], ProjectResponse.prototype, "construction_types", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project materials'
    }),
    _ts_metadata("design:type", Array)
], ProjectResponse.prototype, "materials", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Image URL',
        required: false
    }),
    _ts_metadata("design:type", String)
], ProjectResponse.prototype, "image_url", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Description',
        required: false
    }),
    _ts_metadata("design:type", String)
], ProjectResponse.prototype, "description", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project contract status'
    }),
    _ts_metadata("design:type", typeof ProjectContractStatus === "undefined" ? Object : ProjectContractStatus)
], ProjectResponse.prototype, "contract_status", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project work status'
    }),
    _ts_metadata("design:type", typeof ProjectWorkStatus === "undefined" ? Object : ProjectWorkStatus)
], ProjectResponse.prototype, "work_status", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Created by user'
    }),
    _ts_metadata("design:type", String)
], ProjectResponse.prototype, "created_user_id", void 0);

//# sourceMappingURL=response.js.map