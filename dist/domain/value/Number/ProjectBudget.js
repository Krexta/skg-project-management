import { PositiveDecimal } from "./DecimalBase.js";
export class ProjectBudget extends PositiveDecimal {
    static from(value = null) {
        return new ProjectBudget({
            value,
            precision: 64,
            scale: 3
        });
    }
}

//# sourceMappingURL=ProjectBudget.js.map