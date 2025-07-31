import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { PostalCode } from "./PostalCode.js";
describe('PostalCode', ()=>{
    it('Should return PostalCode when input is valid', ()=>{
        fc.assert(fc.property(fc.string({
            minLength: 7,
            maxLength: 7
        }).map((name)=>name.trim()), (name)=>{
            fc.pre(name.length === 7);
            const value = PostalCode.from(name);
            expect(value).toBeInstanceOf(PostalCode);
            expect(value.value).toEqual(name);
        }));
    });
    it('Should throw "PostalCode must be 7 characters" name when input too long string', ()=>{
        fc.assert(fc.property(fc.string({
            minLength: 8
        }).map((name)=>name.trim()), (name)=>{
            fc.pre(name.length > 8);
            expect(()=>{
                PostalCode.from(name);
            }).toThrow(/PostalCode must be 7 characters/);
        }));
    });
    it('Should throw "PostalCode must not be empty" when input empty string', ()=>{
        fc.assert(fc.property(fc.constantFrom('', ' ', '　'), (name)=>{
            expect(()=>{
                PostalCode.from(name);
            }).toThrow(/PostalCode must not be empty/);
        }));
    });
});

//# sourceMappingURL=PostalCode.spec.js.map