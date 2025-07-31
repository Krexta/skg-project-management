import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { Province } from "./Province.js";
describe('Province', ()=>{
    it('Should return Province when input is valid', ()=>{
        fc.assert(fc.property(fc.string({
            minLength: 1,
            maxLength: 256
        }).map((name)=>name.trim()), (name)=>{
            fc.pre(name.length > 1 && name.length < 257);
            const value = Province.from(name);
            expect(value).toBeInstanceOf(Province);
            expect(value.value).toEqual(name);
        }));
    });
    it('Should throw "Province has maximum length of 256" name when input too long string', ()=>{
        fc.assert(fc.property(fc.string({
            minLength: 257
        }).map((name)=>name.trim()), (name)=>{
            fc.pre(name.length > 256);
            expect(()=>{
                Province.from(name);
            }).toThrow(/Province has maximum length of 256/);
        }));
    });
    it('Should throw "Province must not be empty" when input empty string', ()=>{
        fc.assert(fc.property(fc.constantFrom('', ' ', '　'), (name)=>{
            expect(()=>{
                Province.from(name);
            }).toThrow(/Province must not be empty/);
        }));
    });
});

//# sourceMappingURL=Province.spec.js.map