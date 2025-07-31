import { BaseValueObject } from "../base.js";
export class PostalCode extends BaseValueObject {
    static from(value) {
        return new PostalCode(value);
    }
    validate(value) {
        const trimmed = value.trim();
        if (trimmed.length === 0) {
            throw new Error('PostalCode must not be empty');
        }
        if (trimmed.length !== 7) {
            throw new Error('PostalCode must be 7 characters');
        }
        return value;
    }
}

//# sourceMappingURL=PostalCode.js.map