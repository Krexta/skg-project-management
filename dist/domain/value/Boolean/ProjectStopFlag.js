import { BaseValueObject } from "../base.js";
export class ProjectStopFlag extends BaseValueObject {
    static from(value) {
        return new ProjectStopFlag(value ?? false);
    }
    validate(value) {
        return value;
    }
}

//# sourceMappingURL=ProjectStopFlag.js.map