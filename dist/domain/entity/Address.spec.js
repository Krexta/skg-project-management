import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { AddressValue, PostalCode, ProjectAddressId, ProjectId, Province } from "../value/index.js";
import { Address } from "./Address.js";
export function createProperty() {
    return fc.record({
        projectAddressId: fc.uuid({
            version: 7
        }),
        projectId: fc.uuid({
            version: 7
        }),
        projectPostalCode: fc.string({
            minLength: 7,
            maxLength: 7
        }),
        projectProvince: fc.string({
            minLength: 1,
            maxLength: 256
        }),
        projectAddress: fc.string({
            minLength: 1,
            maxLength: 256
        })
    }).filter(({ projectPostalCode, projectProvince, projectAddress })=>projectPostalCode.trim().length === 7 && projectProvince.trim().length > 1 && projectProvince.trim().length <= 256 && projectAddress.trim().length > 1 && projectAddress.trim().length <= 256).map(({ projectAddressId, projectId, projectPostalCode, projectProvince, projectAddress })=>({
            projectAddressId: ProjectAddressId.from(projectAddressId),
            projectId: ProjectId.from(projectId),
            projectPostalCode: PostalCode.from(projectPostalCode),
            projectProvince: Province.from(projectProvince),
            projectAddress: AddressValue.from(projectAddress)
        }));
}
export function updateProperty() {
    return fc.record({
        projectPostalCode: fc.option(fc.string({
            minLength: 7,
            maxLength: 7
        }).filter((value)=>value.trim().length === 7)),
        projectProvince: fc.option(fc.string({
            minLength: 1,
            maxLength: 256
        }).filter((value)=>value.trim().length <= 256 && value.trim().length > 1)),
        projectAddress: fc.option(fc.string({
            minLength: 1,
            maxLength: 256
        }).filter((value)=>value.trim().length <= 256 && value.trim().length > 1))
    }).map(({ projectPostalCode, projectProvince, projectAddress })=>({
            projectPostalCode: projectPostalCode ? PostalCode.from(projectPostalCode) : undefined,
            projectProvince: projectProvince ? Province.from(projectProvince) : undefined,
            projectAddress: projectAddress ? AddressValue.from(projectAddress) : undefined
        }));
}
describe('Address', ()=>{
    it('should return Address when input is valid', ()=>{
        fc.assert(fc.property(createProperty(), (args)=>{
            const address = new Address(args);
            expect(address).toBeInstanceOf(Address);
            expect(address.projectAddressId).toEqual(args.projectAddressId);
            expect(address.projectId).toEqual(args.projectId);
            expect(address.projectPostalCode).toEqual(args.projectPostalCode);
            expect(address.projectProvince).toEqual(args.projectProvince);
            expect(address.projectAddress).toEqual(args.projectAddress);
        }));
    });
    describe('update', ()=>{
        it('should return Address when input is valid', ()=>{
            fc.assert(fc.property(fc.record({
                dataToCreate: createProperty(),
                dataToUpdate: updateProperty()
            }), ({ dataToCreate, dataToUpdate })=>{
                const address = new Address(dataToCreate);
                expect(address).toBeInstanceOf(Address);
                const updated = address.update(dataToUpdate);
                expect(updated.projectAddressId.value).toEqual(dataToCreate.projectAddressId.value);
                expect(updated.projectId.value).toEqual(dataToCreate.projectId.value);
                expect(updated.projectPostalCode?.value).toEqual(dataToUpdate.projectPostalCode?.value);
                expect(updated.projectProvince?.value).toEqual(dataToUpdate.projectProvince?.value);
                expect(updated.projectAddress?.value).toEqual(dataToUpdate.projectAddress?.value);
            }));
        });
    });
});

//# sourceMappingURL=Address.spec.js.map