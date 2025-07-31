import { BaseValueObject } from "../base.js";
export const WORK_TYPE_LIST = [
    'zaikou',
    'han_zaikou',
    'jouyou',
    'tema_uke',
    'kouji_uke',
    'isshiki'
];
export const CONTRACT_TYPE_LIST = [
    'first_tier',
    'second_tier',
    'third_tier_and_below'
];
export const MATERIAL_LIST = [
    'ALC',
    'ECP'
];
export const CONSTRUCTION_TYPE_LIST = [
    'general_civil_engineering_work',
    'general_building_work',
    'carpentry_work',
    'plastering_work',
    'scaffolding_work_earth_work_and_concret_work',
    'masonry_work'
];
export class WorkType extends BaseValueObject {
    static from(value) {
        return new WorkType(value);
    }
    validate(value) {
        if (!WORK_TYPE_LIST.includes(value)) {
            throw new Error('Invalid work type');
        }
        return value;
    }
}
export class ContractType extends BaseValueObject {
    static from(value) {
        return new ContractType(value);
    }
    validate(value) {
        if (!CONTRACT_TYPE_LIST.includes(value)) {
            throw new Error('Invalid contract type');
        }
        return value;
    }
}
export class Material extends BaseValueObject {
    static from(value) {
        return new Material(value);
    }
    validate(value) {
        if (!MATERIAL_LIST.includes(value)) {
            throw new Error('Invalid material');
        }
        return value;
    }
}
export class ConstructionType extends BaseValueObject {
    static from(value) {
        return new ConstructionType(value);
    }
    validate(value) {
        if (!CONSTRUCTION_TYPE_LIST.includes(value)) {
            throw new Error('Invalid construction type');
        }
        return value;
    }
}

//# sourceMappingURL=MasterType.js.map