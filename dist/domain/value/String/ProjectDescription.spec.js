import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { ProjectDescription } from "./ProjectDescription.js";
describe('ProjectDescription', ()=>{
    it('should return ProjectDescription when input is valid', ()=>{
        fc.assert(fc.property(fc.option(fc.string().map((description)=>description.trim())), (description)=>{
            const value = ProjectDescription.from(description);
            expect(value).toBeInstanceOf(ProjectDescription);
            expect(value.value).toEqual(description ?? '');
        }));
    });
});

//# sourceMappingURL=ProjectDescription.spec.js.map