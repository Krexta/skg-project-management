import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { AddressValue } from "./AddressValue.js";
describe('AddressValue', ()=>{
    it('Should return AddressValue when input is valid', ()=>{
        fc.assert(fc.property(fc.string({
            minLength: 1,
            maxLength: 256
        }).map((name)=>name.trim()), (name)=>{
            fc.pre(name.length > 0 && name.length < 257);
            const value = AddressValue.from(name);
            expect(value).toBeInstanceOf(AddressValue);
            expect(value.value).toEqual(name);
        }));
    });
    it('Should throw "AddressValue has maximum length of 256" name when input too long string', ()=>{
        fc.assert(fc.property(fc.string({
            minLength: 257
        }).map((name)=>name.trim()), (name)=>{
            fc.pre(name.length > 256);
            expect(()=>{
                AddressValue.from(name);
            }).toThrow(/AddressValue has maximum length of 256/);
        }));
    });
    it('Should throw "AddressValue must not be empty" when input empty string', ()=>{
        fc.assert(fc.property(fc.constantFrom('', ' ', '　'), (name)=>{
            expect(()=>{
                AddressValue.from(name);
            }).toThrow(/AddressValue must not be empty/);
        }));
    });
});

//# sourceMappingURL=AddressValue.spec.js.map