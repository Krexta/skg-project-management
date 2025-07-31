import { BaseValueObject } from "../base.js";
export class ProjectDescription extends BaseValueObject {
    static from(value) {
        return new ProjectDescription(value ?? '');
    }
    validate(value) {
        const trimmed = value.trim();
        return trimmed;
    }
}

//# sourceMappingURL=ProjectDescription.js.map