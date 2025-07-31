import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { Scale } from "./Scale.js";
describe('Scale', ()=>{
    it('should return Scale when input is valid', ()=>{
        fc.assert(fc.property(fc.option(fc.stringMatching(/^\d{1,14}(\.\d)?$/), {
            nil: null
        }), (scale)=>{
            const value = Scale.from(scale);
            expect(value).toBeInstanceOf(Scale);
            expect(value.value).toEqual({
                value: scale,
                precision: 15,
                scale: 1
            });
        }));
    });
    it('should throw "Scale must be number" when input NaN', ()=>{
        fc.assert(fc.property(fc.string().filter((val)=>Number.isNaN(Number(val))), (budget)=>{
            expect(()=>Scale.from(budget)).toThrow(/Scale must be number/);
        }));
    });
    it('should throw "Scale must be Decimal(15,1)" when input not Decimal(15,1)', ()=>{
        fc.assert(fc.property(fc.stringMatching(/^\d{1,13}(\.[1-9]{2,})$/), (scale)=>{
            expect(()=>Scale.from(scale)).toThrow(/Scale must be Decimal\(15,1\)/);
        }));
    });
    it('should throw "Scale must be positive" when input negative number', ()=>{
        fc.assert(fc.property(fc.integer({
            max: -1
        }).map((v)=>v.toString()), (scale)=>{
            expect(()=>Scale.from(scale)).toThrow(/Scale must be positive/);
        }));
    });
    describe('toValue()', ()=>{
        it('should return string of value when current value is not null', ()=>{
            fc.assert(fc.property(fc.stringMatching(/^\d{1,14}(\.\d)?$/), (scale)=>{
                const value = Scale.from(scale);
                expect(value.toValue()).toEqual(scale);
            }));
        });
        it('should return null when current value is null', ()=>{
            const value = Scale.from(null);
            expect(value.toValue()).toEqual(null);
        });
    });
});

//# sourceMappingURL=Scale.spec.js.map