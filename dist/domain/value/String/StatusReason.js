import { BaseValueObject } from "../base.js";
export class StatusReason extends BaseValueObject {
    static from(value) {
        return new StatusReason(value);
    }
    validate(value) {
        const trimmed = value.trim();
        if (trimmed.length === 0) {
            throw new Error('StatusReason must not be empty');
        }
        return value;
    }
}

//# sourceMappingURL=StatusReason.js.map