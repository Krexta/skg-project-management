import fc from "fast-check";
import * as uuid from "uuid";
import { describe, expect, it } from "vitest";
import { ContractorId, CreatedUserId, CustomerId, ImageId, MemberId, ProjectAddressId, ProjectBindId, ProjectConstructionTypeId, ProjectContractStatusId, ProjectId, ProjectMaterialId, ProjectWorkStatusId } from "./Uuid.js";
describe('Uuid', ()=>{
    describe('ProjectId', ()=>{
        it('should return ProjectId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const value = ProjectId.from(id);
                expect(value).toBeInstanceOf(ProjectId);
                expect(value.value).toEqual(id);
            }));
        });
        it('should throw "Invalid UUID v7" when input is invalid', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 2,
                maxLength: 32
            }), (id)=>{
                expect(()=>ProjectId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('You can generate a new ProjectId', ()=>{
            const projectId = ProjectId.make();
            expect(projectId).toBeInstanceOf(ProjectId);
            expect(uuid.validate(projectId.value)).toBe(true);
            expect(uuid.version(projectId.value)).toBe(7);
        });
    });
    describe('ProjectWorkStatusId', ()=>{
        it('should return ProjectWorkStatusId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const value = ProjectWorkStatusId.from(id);
                expect(value).toBeInstanceOf(ProjectWorkStatusId);
                expect(value.value).toEqual(id);
            }));
        });
        it('should throw "Invalid UUID v7" when input is invalid', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 2,
                maxLength: 32
            }), (id)=>{
                expect(()=>ProjectWorkStatusId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('You can generate a new ProjectWorkStatusId', ()=>{
            const projectWorkStatusId = ProjectWorkStatusId.make();
            expect(projectWorkStatusId).toBeInstanceOf(ProjectWorkStatusId);
            expect(uuid.validate(projectWorkStatusId.value)).toBe(true);
            expect(uuid.version(projectWorkStatusId.value)).toBe(7);
        });
    });
    describe('ProjectContractStatusId', ()=>{
        it('should return ProjectContractStatusId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const value = ProjectContractStatusId.from(id);
                expect(value).toBeInstanceOf(ProjectContractStatusId);
                expect(value.value).toEqual(id);
            }));
        });
        it('should throw "Invalid UUID v7" when input is invalid', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 2,
                maxLength: 32
            }), (id)=>{
                expect(()=>ProjectContractStatusId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('You can generate a new ProjectContractStatusId', ()=>{
            const projectContractStatusId = ProjectContractStatusId.make();
            expect(projectContractStatusId).toBeInstanceOf(ProjectContractStatusId);
            expect(uuid.validate(projectContractStatusId.value)).toBe(true);
            expect(uuid.version(projectContractStatusId.value)).toBe(7);
        });
    });
    describe('ProjectAddressId', ()=>{
        it('should return ProjectAddressId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const value = ProjectAddressId.from(id);
                expect(value).toBeInstanceOf(ProjectAddressId);
                expect(value.value).toEqual(id);
            }));
        });
        it('should throw "Invalid UUID v7" when input is invalid', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 2,
                maxLength: 32
            }), (id)=>{
                expect(()=>ProjectAddressId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('You can generate a new ProjectAddressId', ()=>{
            const projectAddressId = ProjectAddressId.make();
            expect(projectAddressId).toBeInstanceOf(ProjectAddressId);
            expect(uuid.validate(projectAddressId.value)).toBe(true);
            expect(uuid.version(projectAddressId.value)).toBe(7);
        });
    });
    describe('CustomerId', ()=>{
        it('should return CustomerId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const value = CustomerId.from(id);
                expect(value).toBeInstanceOf(CustomerId);
                expect(value.value).toEqual(id);
            }));
        });
        it('should throw "Invalid UUID v7" when input is invalid', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 2,
                maxLength: 32
            }), (id)=>{
                expect(()=>CustomerId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
    });
    describe('ContractorId', ()=>{
        it('should return ContractorId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const value = ContractorId.from(id);
                expect(value).toBeInstanceOf(ContractorId);
                expect(value.value).toEqual(id);
            }));
        });
        it('should throw "Invalid UUID v7" when input is invalid', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 2,
                maxLength: 32
            }), (id)=>{
                expect(()=>ContractorId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
    });
    describe('CreatedUserId', ()=>{
        it('should return CreatedUserId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const value = CreatedUserId.from(id);
                expect(value).toBeInstanceOf(CreatedUserId);
                expect(value.value).toEqual(id);
            }));
        });
        it('should throw "Invalid UUID v7" when input is invalid', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 2,
                maxLength: 32
            }), (id)=>{
                expect(()=>CreatedUserId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('You can generate a new CreatedUserId', ()=>{
            const createdUserId = CreatedUserId.make();
            expect(createdUserId).toBeInstanceOf(CreatedUserId);
            expect(uuid.validate(createdUserId.value)).toBe(true);
            expect(uuid.version(createdUserId.value)).toBe(7);
        });
    });
    describe('MemberId', ()=>{
        it('should return MemberId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const value = MemberId.from(id);
                expect(value).toBeInstanceOf(MemberId);
                expect(value.value).toEqual(id);
            }));
        });
        it('should throw "Invalid UUID v7" when input is invalid', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 2,
                maxLength: 32
            }), (id)=>{
                expect(()=>MemberId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
    });
    describe('ProjectMaterialId', ()=>{
        it('should return ProjectMaterialId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const value = ProjectMaterialId.from(id);
                expect(value).toBeInstanceOf(ProjectMaterialId);
                expect(value.value).toEqual(id);
            }));
        });
        it('should throw "Invalid UUID v7" when input is invalid', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 2,
                maxLength: 32
            }), (id)=>{
                expect(()=>ProjectMaterialId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('You can generate a new ProjectMaterialId', ()=>{
            const projectMaterialId = ProjectMaterialId.make();
            expect(projectMaterialId).toBeInstanceOf(ProjectMaterialId);
            expect(uuid.validate(projectMaterialId.value)).toBe(true);
            expect(uuid.version(projectMaterialId.value)).toBe(7);
        });
    });
    describe('ProjectConstructionTypeId', ()=>{
        it('should return ProjectConstructionTypeId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const value = ProjectConstructionTypeId.from(id);
                expect(value).toBeInstanceOf(ProjectConstructionTypeId);
                expect(value.value).toEqual(id);
            }));
        });
        it('should throw "Invalid UUID v7" when input is invalid', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 2,
                maxLength: 32
            }), (id)=>{
                expect(()=>ProjectConstructionTypeId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('You can generate a new ProjectConstructionTypeId', ()=>{
            const projectConstructionTypeId = ProjectConstructionTypeId.make();
            expect(projectConstructionTypeId).toBeInstanceOf(ProjectConstructionTypeId);
            expect(uuid.validate(projectConstructionTypeId.value)).toBe(true);
            expect(uuid.version(projectConstructionTypeId.value)).toBe(7);
        });
    });
    describe('ImageId', ()=>{
        it('should return ImageId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const value = ImageId.from(id);
                expect(value).toBeInstanceOf(ImageId);
                expect(value.value).toEqual(id);
            }));
        });
        it('should throw "Invalid UUID v7" when input is invalid', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 2,
                maxLength: 32
            }), (id)=>{
                expect(()=>ImageId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('You can generate a new ImageId', ()=>{
            const imageId = ImageId.make();
            expect(imageId).toBeInstanceOf(ImageId);
            expect(uuid.validate(imageId.value)).toBe(true);
            expect(uuid.version(imageId.value)).toBe(7);
        });
    });
    describe('ProjectBindId', ()=>{
        it('should return ProjectBindId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const value = ProjectBindId.from(id);
                expect(value).toBeInstanceOf(ProjectBindId);
                expect(value.value).toEqual(id);
            }));
        });
        it('should throw "Invalid UUID v7" when input is invalid', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 2,
                maxLength: 32
            }), (id)=>{
                expect(()=>ProjectBindId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('You can generate a new ProjectBindId', ()=>{
            const projectBindId = ProjectBindId.make();
            expect(projectBindId).toBeInstanceOf(ProjectBindId);
            expect(uuid.validate(projectBindId.value)).toBe(true);
            expect(uuid.version(projectBindId.value)).toBe(7);
        });
    });
});

//# sourceMappingURL=Uuid.spec.js.map