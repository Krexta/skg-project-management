import { BaseValueObject } from "../base.js";
export class ProjectName extends BaseValueObject {
    static from(value) {
        return new ProjectName(value);
    }
    validate(value) {
        const trimmed = value.trim();
        if (trimmed.length === 0) {
            throw new Error('ProjectName must not be empty');
        }
        if (trimmed.length > 256) {
            throw new Error('ProjectName has maximum length of 256');
        }
        return value;
    }
}
export class ProjectTypeName extends BaseValueObject {
    static from(value) {
        return new ProjectTypeName(value);
    }
    validate(value) {
        const trimmed = value.trim();
        if (trimmed.length === 0) {
            throw new Error('ProjectTypeName must not be empty');
        }
        if (trimmed.length > 45) {
            throw new Error('ProjectTypeName has maximum length of 45');
        }
        return value;
    }
}
export class ProjectContractTypeName extends BaseValueObject {
    static from(value) {
        return new ProjectContractTypeName(value);
    }
    validate(value) {
        const trimmed = value.trim();
        if (trimmed.length === 0) {
            throw new Error('ProjectContractTypeName must not be empty');
        }
        if (trimmed.length > 45) {
            throw new Error('ProjectContractTypeName has maximum length of 45');
        }
        return value;
    }
}
export class MaterialName extends BaseValueObject {
    static from(value) {
        return new MaterialName(value);
    }
    validate(value) {
        const trimmed = value.trim();
        if (trimmed.length === 0) {
            throw new Error('MaterialName must not be empty');
        }
        if (trimmed.length > 256) {
            throw new Error('MaterialName has maximum length of 256');
        }
        return value;
    }
}
export class ConstructionTypeName extends BaseValueObject {
    static from(value) {
        return new ConstructionTypeName(value);
    }
    validate(value) {
        const trimmed = value.trim();
        if (trimmed.length === 0) {
            throw new Error('ConstructionTypeName must not be empty');
        }
        if (trimmed.length > 50) {
            throw new Error('ConstructionTypeName has maximum length of 50');
        }
        return value;
    }
}

//# sourceMappingURL=Name.js.map