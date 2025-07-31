import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { ProjectBudget } from "./ProjectBudget.js";
describe('ProjectBudget', ()=>{
    it('should return ProjectBudget when input is valid', ()=>{
        fc.assert(fc.property(fc.option(fc.stringMatching(/^\d{1,61}(\.\d{1,3})?$/), {
            nil: null
        }), (budget)=>{
            const value = ProjectBudget.from(budget);
            expect(value).toBeInstanceOf(ProjectBudget);
            expect(value.value).toEqual({
                value: budget,
                precision: 64,
                scale: 3
            });
        }));
    });
    it('should throw "ProjectBudget must be number" when input NaN', ()=>{
        fc.assert(fc.property(fc.string().filter((val)=>Number.isNaN(Number(val))), (budget)=>{
            expect(()=>ProjectBudget.from(budget)).toThrow(/ProjectBudget must be number/);
        }));
    });
    it('should throw "ProjectBudget must be Decimal(64,3)" when input not Decimal(64,3)', ()=>{
        fc.assert(fc.property(fc.stringMatching(/^\d{1,60}(\.[1-9]{4,})$/), (budget)=>{
            expect(()=>ProjectBudget.from(budget)).toThrow(/ProjectBudget must be Decimal\(64,3\)/);
        }));
    });
    it('should throw "ProjectBudget must be positive" when input negative number', ()=>{
        fc.assert(fc.property(fc.integer({
            max: -1
        }).map((v)=>v.toString()), (budget)=>{
            expect(()=>ProjectBudget.from(budget)).toThrow(/ProjectBudget must be positive/);
        }));
    });
    describe('toValue()', ()=>{
        it('should return string of value when current value is not null', ()=>{
            fc.assert(fc.property(fc.stringMatching(/^\d{1,61}(\.\d{1,3})?$/), (budget)=>{
                const value = ProjectBudget.from(budget);
                expect(value.toValue()).toEqual(budget);
            }));
        });
        it('should return null when current value is null', ()=>{
            const value = ProjectBudget.from(null);
            expect(value.toValue()).toEqual(null);
        });
    });
});

//# sourceMappingURL=ProjectBudget.spec.js.map