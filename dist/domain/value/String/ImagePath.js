import { BaseValueObject } from "../base.js";
export class ImagePath extends BaseValueObject {
    static from(value) {
        return new ImagePath(value ?? null);
    }
    validate(value) {
        if (value) {
            const trimmed = value.trim();
            if (trimmed.length > 400) {
                throw new Error('ImagePath has maximum length of 400');
            }
        }
        return value;
    }
}

//# sourceMappingURL=ImagePath.js.map