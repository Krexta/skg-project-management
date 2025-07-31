import { PositiveDecimal } from "./DecimalBase.js";
export class TotalManWork extends PositiveDecimal {
    static from(value = null) {
        return new TotalManWork({
            value,
            precision: 10,
            scale: 2
        });
    }
}

//# sourceMappingURL=TotalManWork.js.map