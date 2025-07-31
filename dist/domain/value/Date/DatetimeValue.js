import { format, toDate } from "date-fns";
import { BaseValueObject } from "../base.js";
import { YearMonthDay } from "./YearMonthDay.js";
export const DATETIME_VALUE_FORMAT = 'yyyy-MM-dd kk:mm:ss';
export class DatetimeValue extends BaseValueObject {
    static from(date) {
        if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(date)) {
            throw new Error(`Invalid YearMonthDay: ${date}`);
        }
        const [left, right] = date.split(' ', 2);
        const [hour, minute, second] = right.split(':', 3);
        return new DatetimeValue([
            YearMonthDay.from(left),
            hour,
            minute,
            second
        ]);
    }
    validate(value) {
        if (!/^([01]?[0-9]|2[0-4])$/.test(value[1])) {
            throw new Error(`Invalid Hour: ${value[1]}`);
        }
        if (!/^([0-5]?[0-9])$/.test(value[2])) {
            throw new Error(`Invalid Minute: ${value[2]}`);
        }
        if (!/^([0-5]?[0-9])$/.test(value[3])) {
            throw new Error(`Invalid Second: ${value[3]}`);
        }
        return value;
    }
    equals(other) {
        const [yearMonthDay, ...remain] = other.value;
        const [currentYMD, ...currentRemain] = this._value;
        return yearMonthDay.equals(currentYMD) && remain.toString() === currentRemain.toString();
    }
    static current() {
        return DatetimeValue.from(format(new Date(), DATETIME_VALUE_FORMAT));
    }
    get hour() {
        return Number(this.value[1]);
    }
    get minute() {
        return Number(this.value[2]);
    }
    get second() {
        return Number(this.value[3]);
    }
    get hourString() {
        return this.value[1];
    }
    get minuteString() {
        return this.value[2];
    }
    get secondString() {
        return this.value[3];
    }
    toDate() {
        return toDate(this.toString());
    }
    toString() {
        return `${this._value[0].toString()} ${this.hourString}:${this.minuteString}:${this.secondString}`;
    }
}

//# sourceMappingURL=DatetimeValue.js.map