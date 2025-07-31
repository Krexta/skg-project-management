import { BaseValueObject } from "../base.js";
export class Province extends BaseValueObject {
    static from(value) {
        return new Province(value);
    }
    validate(value) {
        const trimmed = value.trim();
        if (trimmed.length === 0) {
            throw new Error('Province must not be empty');
        }
        if (trimmed.length > 256) {
            throw new Error('Province has maximum length of 256');
        }
        return value;
    }
}

//# sourceMappingURL=Province.js.map