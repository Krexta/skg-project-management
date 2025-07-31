import { BaseValueObject } from "../base.js";
export class AddressValue extends BaseValueObject {
    static from(value) {
        return new AddressValue(value);
    }
    validate(value) {
        const trimmed = value.trim();
        if (trimmed.length === 0) {
            throw new Error('AddressValue must not be empty');
        }
        if (trimmed.length > 256) {
            throw new Error('AddressValue has maximum length of 256');
        }
        return value;
    }
}

//# sourceMappingURL=AddressValue.js.map