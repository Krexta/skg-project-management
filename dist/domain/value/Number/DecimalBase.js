import { BaseValueObject } from "../base.js";
let Decimal = class Decimal extends BaseValueObject {
    validate(val) {
        const { value, precision, scale } = val;
        if (value === null) {
            return val;
        }
        if (Number.isNaN(Number(value))) {
            throw new Error(`${this.constructor.name} must be number`);
        }
        if (!this.isValidDecimal(value, precision, scale)) {
            throw new Error(`${this.constructor.name} must be Decimal(${precision},${scale})`);
        }
        return val;
    }
    isValidDecimal(stringValue, maxDigits, maxDecimals) {
        // Reject scientific notation (e.g., 2222e10)
        if (stringValue.includes('e') || stringValue.includes('E')) {
            return false;
        }
        // Dynamic regex for DECIMAL(X,Y)
        const decimalRegex = new RegExp(`^-?\\d{1,${maxDigits - maxDecimals}}(\\.\\d{1,${maxDecimals}})?$`);
        if (!decimalRegex.test(stringValue)) {
            return false;
        }
        // Check range constraints (optional)
        const maxValue = Math.pow(10, maxDigits) - Math.pow(10, -maxDecimals);
        const minValue = -Math.pow(10, maxDigits) + Math.pow(10, -maxDecimals);
        return Number(stringValue) >= minValue && Number(stringValue) <= maxValue;
    }
    toValue() {
        return this._value.value;
    }
};
export class PositiveDecimal extends Decimal {
    validate(val) {
        val = super.validate(val);
        if (val.value !== null && Number(val.value) < 0) {
            throw new Error(`${this.constructor.name} must be positive`);
        }
        return val;
    }
}

//# sourceMappingURL=DecimalBase.js.map