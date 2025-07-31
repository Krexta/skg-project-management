import { format } from "date-fns";
import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { DATETIME_VALUE_FORMAT, DatetimeValue } from "./DatetimeValue.js";
describe('DatetimeValue', ()=>{
    it('should return DatetimeValue when input valid', ()=>{
        fc.assert(fc.property(fc.record({
            date: fc.date({
                min: new Date(2000, 12, 31, 24, 60, 60),
                max: new Date(4000, 12, 31, 24, 60, 60)
            })
        }).map(({ date })=>{
            return {
                date: format(date, DATETIME_VALUE_FORMAT)
            };
        }), ({ date })=>{
            const ymdhms = date.split(' ', 2);
            const [hour, minute, second] = ymdhms[1].split(':', 3);
            const value = DatetimeValue.from(date);
            expect(value).toBeInstanceOf(DatetimeValue);
            expect(value.hour).toEqual(Number(hour));
            expect(value.minute).toEqual(Number(minute));
            expect(value.second).toEqual(Number(second));
            expect(value.toString()).toEqual(date);
        }));
    });
    it('should throw invalid YearMonthDay exception when input invalid YearMonthDay', ()=>{
        fc.assert(fc.property(fc.integer({
            min: 1,
            max: 3
        }), (year)=>{
            expect(()=>DatetimeValue.from(`${year}-01-01 10:20:23`)).toThrow(/Invalid YearMonthDay/);
        }));
    });
    it('should throw invalid hour exception when input invalid hour', ()=>{
        fc.assert(fc.property(fc.integer({
            min: 25,
            max: 50
        }), (hour)=>{
            expect(()=>DatetimeValue.from(`2024-11-01 ${hour}:20:23`)).toThrow(/Invalid Hour/);
        }));
    });
    it('should throw invalid minute exception when input invalid minute', ()=>{
        fc.assert(fc.property(fc.integer({
            min: 61,
            max: 90
        }), (minute)=>{
            expect(()=>DatetimeValue.from(`2024-11-01 10:${minute}:23`)).toThrow(/Invalid Minute/);
        }));
    });
    it('should throw invalid second exception when input invalid second', ()=>{
        fc.assert(fc.property(fc.integer({
            min: 61,
            max: 90
        }), (second)=>{
            expect(()=>DatetimeValue.from(`2024-11-01 10:20:${second}`)).toThrow(/Invalid Second/);
        }));
    });
    it('should return true when call equals function with two DatetimeValue has same value', ()=>{
        fc.assert(fc.property(fc.record({
            date: fc.date({
                min: new Date(2000, 12, 31, 24, 60, 60),
                max: new Date(4000, 12, 31, 24, 60, 60)
            })
        }).map(({ date })=>({
                date: format(date, DATETIME_VALUE_FORMAT)
            })), ({ date })=>{
            const value1 = DatetimeValue.from(date);
            const value2 = DatetimeValue.from(date);
            expect(value1).toBeInstanceOf(DatetimeValue);
            expect(value2).toBeInstanceOf(DatetimeValue);
            expect(value1.toString()).toEqual(date);
            expect(value2.toString()).toEqual(date);
            expect(value1.equals(value2)).toBe(true);
        }));
    });
});

//# sourceMappingURL=DatetimeValue.spec.js.map