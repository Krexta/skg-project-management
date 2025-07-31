import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { StatusReason } from "./StatusReason.js";
describe('StatusReason', ()=>{
    it('Should return StatusReason when input is valid', ()=>{
        fc.assert(fc.property(fc.string({
            minLength: 1
        }).map((name)=>name.trim()), (name)=>{
            fc.pre(name.length > 1);
            const value = StatusReason.from(name);
            expect(value).toBeInstanceOf(StatusReason);
            expect(value.value).toEqual(name);
        }));
    });
    it('Should throw "StatusReason must not be empty" when input empty string', ()=>{
        fc.assert(fc.property(fc.constantFrom('', ' ', '　'), (name)=>{
            expect(()=>{
                StatusReason.from(name);
            }).toThrow(/StatusReason must not be empty/);
        }));
    });
});

//# sourceMappingURL=StatusReason.spec.js.map