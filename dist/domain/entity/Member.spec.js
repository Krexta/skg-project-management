import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { MemberId, ProjectBindId, ProjectId } from "../value/index.js";
import { Member } from "./Member.js";
describe('Member', ()=>{
    it('should return Member when input is valid', ()=>{
        fc.assert(fc.property(fc.record({
            projectBindId: fc.uuid({
                version: 7
            }),
            projectMemberId: fc.uuid({
                version: 7
            }),
            projectId: fc.uuid({
                version: 7
            })
        }).map(({ projectBindId, projectMemberId, projectId })=>({
                projectBindId: ProjectBindId.from(projectBindId),
                projectMemberId: MemberId.from(projectMemberId),
                projectId: ProjectId.from(projectId)
            })), (args)=>{
            const value = new Member(args);
            expect(value).toBeInstanceOf(Member);
            expect(value).toEqual(args);
        }));
    });
});

//# sourceMappingURL=Member.spec.js.map