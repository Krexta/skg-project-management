import { PositiveDecimal } from "./DecimalBase.js";
export class Scale extends PositiveDecimal {
    static from(value = null) {
        return new Scale({
            value,
            precision: 15,
            scale: 1
        });
    }
}

//# sourceMappingURL=Scale.js.map