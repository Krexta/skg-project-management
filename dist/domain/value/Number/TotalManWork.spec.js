import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { TotalManWork } from "./TotalManWork.js";
describe('TotalManWork', ()=>{
    it('should return TotalManWork when input is valid', ()=>{
        fc.assert(fc.property(fc.option(fc.stringMatching(/^\d{1,8}(\.\d{1,2})?$/), {
            nil: null
        }), (totalManWork)=>{
            const value = TotalManWork.from(totalManWork);
            expect(value).toBeInstanceOf(TotalManWork);
            expect(value.value).toEqual({
                value: totalManWork,
                precision: 10,
                scale: 2
            });
        }));
    });
    it('should throw "TotalManWork must be number" when input NaN', ()=>{
        fc.assert(fc.property(fc.string().filter((val)=>Number.isNaN(Number(val))), (totalManWork)=>{
            expect(()=>TotalManWork.from(totalManWork)).toThrow(/TotalManWork must be number/);
        }));
    });
    it('should throw "TotalManWork must be Decimal(10,2)" when input not Decimal(10,2)', ()=>{
        fc.assert(fc.property(fc.stringMatching(/^\d{1,7}(\.[1-9]{3,})$/), (totalManWork)=>{
            expect(()=>TotalManWork.from(totalManWork)).toThrow(/TotalManWork must be Decimal\(10,2\)/);
        }));
    });
    it('should throw "TotalManWork must be positive" when input negative number', ()=>{
        fc.assert(fc.property(fc.integer({
            min: -(10 ^ 8),
            max: -1
        }).map((v)=>v.toString()), (totalManWork)=>{
            expect(()=>TotalManWork.from(totalManWork)).toThrow(/TotalManWork must be positive/);
        }));
    });
    describe('toValue()', ()=>{
        it('should return string of value when current value is not null', ()=>{
            fc.assert(fc.property(fc.stringMatching(/^\d{1,8}(\.\d{1,2})?$/), (total)=>{
                const value = TotalManWork.from(total);
                expect(value.toValue()).toEqual(total);
            }));
        });
        it('should return null when current value is null', ()=>{
            const value = TotalManWork.from(null);
            expect(value.toValue()).toEqual(null);
        });
    });
});

//# sourceMappingURL=TotalManWork.spec.js.map