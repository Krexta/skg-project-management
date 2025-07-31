import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { ProjectStopFlag } from "./ProjectStopFlag.js";
describe('ProjectStopFlag', ()=>{
    it('should return ProjectStopFlag when input is boolean', ()=>{
        fc.assert(fc.property(fc.boolean(), (flag)=>{
            const value = ProjectStopFlag.from(flag);
            expect(value).toBeInstanceOf(ProjectStopFlag);
            expect(value.value).toEqual(flag);
        }));
    });
    it('should return ProjectStopFlag when input is null or undefined', ()=>{
        fc.assert(fc.property(fc.constantFrom(null, undefined), (flag)=>{
            const value = ProjectStopFlag.from(flag);
            const expectedValue = false;
            expect(value).toBeInstanceOf(ProjectStopFlag);
            expect(value.value).toEqual(expectedValue);
        }));
    });
    it('should return true when call equals with two ProjectStopFlag has same boolean value', ()=>{
        fc.assert(fc.property(fc.boolean(), (flag)=>{
            const value1 = ProjectStopFlag.from(flag);
            const value2 = ProjectStopFlag.from(flag);
            expect(value1).toBeInstanceOf(ProjectStopFlag);
            expect(value2).toBeInstanceOf(ProjectStopFlag);
            expect(value1.value).toEqual(flag);
            expect(value2.value).toEqual(flag);
            expect(value1.equals(value2)).toBe(true);
        }));
    });
    it('should return true when call equals with two ProjectStopFlag has same falsy value', ()=>{
        fc.assert(fc.property(fc.constantFrom(undefined, null), (flag)=>{
            const value1 = ProjectStopFlag.from(flag);
            const value2 = ProjectStopFlag.from(flag);
            const expectedValue = false;
            expect(value1).toBeInstanceOf(ProjectStopFlag);
            expect(value2).toBeInstanceOf(ProjectStopFlag);
            expect(value1.value).toEqual(expectedValue);
            expect(value2.value).toEqual(expectedValue);
            expect(value1.equals(value2)).toBe(true);
        }));
    });
    it('should return false when call equals with two ProjectStopFlag has different boolean value', ()=>{
        fc.assert(fc.property(fc.tuple(fc.boolean(), fc.boolean()), ([flag1, flag2])=>{
            fc.pre(flag1 !== flag2);
            const value1 = ProjectStopFlag.from(flag1);
            const value2 = ProjectStopFlag.from(flag2);
            expect(value1).toBeInstanceOf(ProjectStopFlag);
            expect(value2).toBeInstanceOf(ProjectStopFlag);
            expect(value1.value).toEqual(flag1);
            expect(value2.value).toEqual(flag2);
            expect(value1.equals(value2)).toBe(false);
        }));
    });
    it('should return false when call equals with one ProjectStopFlag has true value and one ProjectStopFlag has falsy value', ()=>{
        fc.assert(fc.property(fc.tuple(fc.constant(true), fc.constantFrom(null, undefined)), ([flag1, flag2])=>{
            const value1 = ProjectStopFlag.from(flag1);
            const value2 = ProjectStopFlag.from(flag2);
            expect(value1).toBeInstanceOf(ProjectStopFlag);
            expect(value2).toBeInstanceOf(ProjectStopFlag);
            expect(value1.value).toEqual(true);
            expect(value2.value).toEqual(false);
            expect(value1.equals(value2)).toBe(false);
        }));
    });
});

//# sourceMappingURL=ProjectStopFlag.spec.js.map