function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID, Matches, MaxLength, ValidateIf } from "class-validator";
export class ProjectCreateRequest {
}
_ts_decorate([
    ApiProperty({
        title: 'Project Name'
    }),
    IsString(),
    MaxLength(256),
    IsNotEmpty(),
    Transform(({ value })=>value?.trim()),
    _ts_metadata("design:type", String)
], ProjectCreateRequest.prototype, "project_name", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Customer ID',
        description: 'UUIDv7'
    }),
    IsUUID(7, {
        message: 'customer_id must be UUIDv7'
    }),
    IsString(),
    _ts_metadata("design:type", String)
], ProjectCreateRequest.prototype, "customer_id", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Contractor ID',
        description: 'UUIDv7'
    }),
    IsUUID(7, {
        message: 'contractor_id must be UUIDv7'
    }),
    IsString(),
    _ts_metadata("design:type", String)
], ProjectCreateRequest.prototype, "contractor_id", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project Type',
        description: 'Enum',
        enum: [
            'zaikou',
            'han_zaikou',
            'jouyou',
            'tema_uke',
            'kouji_uke',
            'isshiki'
        ]
    }),
    IsEnum([
        'zaikou',
        'han_zaikou',
        'jouyou',
        'tema_uke',
        'kouji_uke',
        'isshiki'
    ], {
        message: "project_type must be one of the following values: ['zaikou', 'han_zaikou', 'jouyou', 'tema_uke', 'kouji_uke', 'isshiki']"
    }),
    _ts_metadata("design:type", String)
], ProjectCreateRequest.prototype, "project_type", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project member ID',
        description: 'UUIDv7'
    }),
    IsUUID(7, {
        message: 'project_member_id must be UUIDv7'
    }),
    IsString(),
    _ts_metadata("design:type", String)
], ProjectCreateRequest.prototype, "project_member_id", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Construction start',
        format: 'yyyy-MM-dd',
        required: false
    }),
    IsDateString({
        strict: true
    }),
    IsOptional(),
    _ts_metadata("design:type", String)
], ProjectCreateRequest.prototype, "construction_start", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Construction Stop',
        format: 'yyyy-MM-dd',
        required: false
    }),
    IsDateString({
        strict: true
    }),
    IsOptional(),
    _ts_metadata("design:type", String)
], ProjectCreateRequest.prototype, "construction_stop", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Construction scale',
        description: `
- Must be positive
- Must be Decimal(15,1)
`,
        required: false
    }),
    IsOptional(),
    Matches(/^\d{1,14}(\.\d)?$/, {
        message: 'construction_scale must be Decimal(15,1)'
    }),
    _ts_metadata("design:type", String)
], ProjectCreateRequest.prototype, "construction_scale", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Budget',
        description: `
- Must be positive
- Must be Decimal(64,3)
`,
        required: false
    }),
    IsOptional(),
    Matches(/^\d{1,61}(\.\d{1,3})?$/, {
        message: 'budget must be Decimal(64,3)'
    }),
    _ts_metadata("design:type", String)
], ProjectCreateRequest.prototype, "budget", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project postal code'
    }),
    MaxLength(7),
    IsNotEmpty(),
    Transform(({ value })=>value?.trim()),
    _ts_metadata("design:type", String)
], ProjectCreateRequest.prototype, "project_postal_code", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project province'
    }),
    MaxLength(256),
    IsNotEmpty(),
    Transform(({ value })=>value?.trim()),
    _ts_metadata("design:type", String)
], ProjectCreateRequest.prototype, "project_province", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project address'
    }),
    MaxLength(256),
    IsNotEmpty(),
    Transform(({ value })=>value?.trim()),
    _ts_metadata("design:type", String)
], ProjectCreateRequest.prototype, "project_address", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Total man works',
        description: `
- Must be positive
- Must be Decimal(10,2)
`,
        required: false
    }),
    IsOptional(),
    Matches(/^\d{1,8}(\.\d{1,2})?$/, {
        message: 'total_man_works must be Decimal(10,2)'
    }),
    _ts_metadata("design:type", String)
], ProjectCreateRequest.prototype, "total_man_works", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Contract type',
        description: 'Enum',
        enum: [
            'first_tier',
            'second_tier',
            'third_tier_and_below'
        ]
    }),
    IsEnum([
        'first_tier',
        'second_tier',
        'third_tier_and_below'
    ], {
        message: "contract_type must be one of the following values: ['first_tier', 'second_tier', 'third_tier_and_below']"
    }),
    _ts_metadata("design:type", String)
], ProjectCreateRequest.prototype, "contract_type", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Construction type IDs',
        description: 'Enum',
        enum: [
            'general_civil_engineering_work',
            'general_building_work',
            'carpentry_work',
            'plastering_work',
            'scaffolding_work_earth_work_and_concret_work',
            'masonry_work'
        ],
        isArray: true
    }),
    IsEnum([
        'general_civil_engineering_work',
        'general_building_work',
        'carpentry_work',
        'plastering_work',
        'scaffolding_work_earth_work_and_concret_work',
        'masonry_work'
    ], {
        message: 'construction_types must be one of the following values: ["general_civil_engineering_work", "general_building_work", "carpentry_work", "plastering_work", "scaffolding_work_earth_work_and_concret_work", "masonry_work"]',
        each: true
    }),
    IsArray(),
    ArrayNotEmpty(),
    _ts_metadata("design:type", Array)
], ProjectCreateRequest.prototype, "construction_types", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Material',
        description: 'Enum',
        enum: [
            'ALC',
            'ECP'
        ],
        isArray: true
    }),
    IsEnum([
        'ALC',
        'ECP'
    ], {
        message: "materials must be one of the following values: ['ALC', 'ECP']",
        each: true
    }),
    IsArray(),
    ArrayNotEmpty(),
    _ts_metadata("design:type", Array)
], ProjectCreateRequest.prototype, "materials", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Image',
        description: 'Project image',
        required: false
    }),
    MaxLength(400),
    IsUrl(),
    IsOptional(),
    _ts_metadata("design:type", String)
], ProjectCreateRequest.prototype, "image_url", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Remarks',
        required: false
    }),
    IsOptional(),
    IsString(),
    _ts_metadata("design:type", String)
], ProjectCreateRequest.prototype, "description", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project work status name',
        required: false,
        enum: [
            'NOT_STARTED',
            'DESIGN_IN_PROGRESS',
            'START_AT_NEXT_MONTH',
            'IN_PROGRESS_AT_SITE',
            'CONSTRUCTION_COMPLETE',
            'MONTHLY_REPORT_COMPLETE',
            'PAYMENT_RECEIVED',
            'ABORTED',
            'DELETED'
        ]
    }),
    IsOptional(),
    IsEnum([
        'NOT_STARTED',
        'DESIGN_IN_PROGRESS',
        'START_AT_NEXT_MONTH',
        'IN_PROGRESS_AT_SITE',
        'CONSTRUCTION_COMPLETE',
        'MONTHLY_REPORT_COMPLETE',
        'PAYMENT_RECEIVED',
        'ABORTED',
        'DELETED'
    ], {
        message: "project_work_status_name must be one of the following values: ['NOT_STARTED', 'DESIGN_IN_PROGRESS', 'START_AT_NEXT_MONTH', 'IN_PROGRESS_AT_SITE', 'CONSTRUCTION_COMPLETE', 'MONTHLY_REPORT_COMPLETE', 'PAYMENT_RECEIVED', 'ABORTED', 'DELETED']"
    }),
    _ts_metadata("design:type", String)
], ProjectCreateRequest.prototype, "project_work_status_name", void 0);
export class ProjectUpdateRequest extends PartialType(ProjectCreateRequest) {
}
_ts_decorate([
    ApiProperty({
        title: 'Project work status reason',
        required: false
    }),
    IsString(),
    IsNotEmpty(),
    Transform(({ value })=>value?.trim()),
    ValidateIf(({ project_work_status_name })=>project_work_status_name !== undefined),
    _ts_metadata("design:type", String)
], ProjectUpdateRequest.prototype, "project_work_status_reason", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project work status name',
        required: false,
        enum: [
            'NOT_STARTED',
            'DESIGN_IN_PROGRESS',
            'START_AT_NEXT_MONTH',
            'IN_PROGRESS_AT_SITE',
            'CONSTRUCTION_COMPLETE',
            'MONTHLY_REPORT_COMPLETE',
            'PAYMENT_RECEIVED',
            'ABORTED',
            'DELETED'
        ]
    }),
    IsNotEmpty(),
    IsEnum([
        'NOT_STARTED',
        'DESIGN_IN_PROGRESS',
        'START_AT_NEXT_MONTH',
        'IN_PROGRESS_AT_SITE',
        'CONSTRUCTION_COMPLETE',
        'MONTHLY_REPORT_COMPLETE',
        'PAYMENT_RECEIVED',
        'ABORTED',
        'DELETED'
    ], {
        message: "project_work_status_name must be one of the following values: ['NOT_STARTED', 'DESIGN_IN_PROGRESS', 'START_AT_NEXT_MONTH', 'IN_PROGRESS_AT_SITE', 'CONSTRUCTION_COMPLETE', 'MONTHLY_REPORT_COMPLETE', 'PAYMENT_RECEIVED', 'ABORTED', 'DELETED']"
    }),
    ValidateIf(({ project_work_status_reason })=>project_work_status_reason !== undefined),
    _ts_metadata("design:type", String)
], ProjectUpdateRequest.prototype, "project_work_status_name", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project contract status reason',
        required: false
    }),
    IsNotEmpty(),
    IsString(),
    Transform(({ value })=>value?.trim()),
    ValidateIf(({ project_contract_status_name })=>project_contract_status_name !== undefined),
    _ts_metadata("design:type", String)
], ProjectUpdateRequest.prototype, "project_contract_status_reason", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project contract status name',
        required: false,
        enum: [
            'NEW',
            'SIGNED',
            'CANCELED'
        ]
    }),
    IsNotEmpty(),
    IsEnum([
        'NEW',
        'SIGNED',
        'CANCELED'
    ], {
        message: "project_contract_status_name must be one of the following values: ['NEW', 'SIGNED', 'CANCELED']"
    }),
    ValidateIf(({ project_contract_status_reason })=>project_contract_status_reason !== undefined),
    _ts_metadata("design:type", String)
], ProjectUpdateRequest.prototype, "project_contract_status_name", void 0);

//# sourceMappingURL=request.js.map