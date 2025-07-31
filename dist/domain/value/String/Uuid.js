import * as uuid from "uuid";
import { BaseValueObject } from "../base.js";
let UuidV7 = class UuidV7 extends BaseValueObject {
    validate(value) {
        if (uuid.validate(value) === false || uuid.version(value) !== 7) {
            throw new Error('Invalid UUID v7: ' + value);
        }
        return value;
    }
};
export class ProjectId extends UuidV7 {
    static from(value) {
        return new ProjectId(value);
    }
    static make() {
        return new ProjectId(uuid.v7());
    }
}
export class ProjectWorkStatusId extends UuidV7 {
    static from(value) {
        return new ProjectWorkStatusId(value);
    }
    static make() {
        return new ProjectWorkStatusId(uuid.v7());
    }
}
export class ProjectContractStatusId extends UuidV7 {
    static from(value) {
        return new ProjectContractStatusId(value);
    }
    static make() {
        return new ProjectContractStatusId(uuid.v7());
    }
}
export class ProjectAddressId extends UuidV7 {
    static from(value) {
        return new ProjectAddressId(value);
    }
    static make() {
        return new ProjectAddressId(uuid.v7());
    }
}
export class CustomerId extends UuidV7 {
    static from(value) {
        return new CustomerId(value);
    }
}
export class ContractorId extends UuidV7 {
    static from(value) {
        return new ContractorId(value);
    }
}
export class CreatedUserId extends UuidV7 {
    static from(value) {
        return new CreatedUserId(value);
    }
    static make() {
        return new CreatedUserId(uuid.v7());
    }
}
export class MemberId extends UuidV7 {
    static from(value) {
        return new MemberId(value);
    }
}
export class ProjectMaterialId extends UuidV7 {
    static from(value) {
        return new ProjectMaterialId(value);
    }
    static make() {
        return new ProjectMaterialId(uuid.v7());
    }
}
export class ProjectConstructionTypeId extends UuidV7 {
    static from(value) {
        return new ProjectConstructionTypeId(value);
    }
    static make() {
        return new ProjectConstructionTypeId(uuid.v7());
    }
}
export class ImageId extends UuidV7 {
    static from(value) {
        return new ImageId(value);
    }
    static make() {
        return new ImageId(uuid.v7());
    }
}
export class ProjectBindId extends UuidV7 {
    static from(value) {
        return new ProjectBindId(value);
    }
    static make() {
        return new ProjectBindId(uuid.v7());
    }
}

//# sourceMappingURL=Uuid.js.map