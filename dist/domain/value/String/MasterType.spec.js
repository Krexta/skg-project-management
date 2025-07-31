import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { CONSTRUCTION_TYPE_LIST, ConstructionType, CONTRACT_TYPE_LIST, ContractType, Material, MATERIAL_LIST, WORK_TYPE_LIST, WorkType } from "./MasterType.js";
describe('MasterType', ()=>{
    describe('WorkType', ()=>{
        it('should return WorkType when input is valid', ()=>{
            fc.assert(fc.property(fc.constantFrom(...WORK_TYPE_LIST), (val)=>{
                const value = WorkType.from(val);
                expect(value).toBeInstanceOf(WorkType);
                expect(value.value).toEqual(val);
            }));
        });
        it('should throw error when input not in enum', ()=>{
            fc.assert(fc.property(fc.string().filter((val)=>!WORK_TYPE_LIST.includes(val)), (status)=>{
                expect(()=>WorkType.from(status)).toThrow(/Invalid work type/);
            }));
        });
    });
    describe('ContractType', ()=>{
        it('should return ContractType when input is valid', ()=>{
            fc.assert(fc.property(fc.constantFrom(...CONTRACT_TYPE_LIST), (val)=>{
                const value = ContractType.from(val);
                expect(value).toBeInstanceOf(ContractType);
                expect(value.value).toEqual(val);
            }));
        });
        it('should throw error when input not in enum', ()=>{
            fc.assert(fc.property(fc.string().filter((val)=>!CONTRACT_TYPE_LIST.includes(val)), (status)=>{
                expect(()=>ContractType.from(status)).toThrow(/Invalid contract type/);
            }));
        });
    });
    describe('Material', ()=>{
        it('should return Material when input is valid', ()=>{
            fc.assert(fc.property(fc.constantFrom(...MATERIAL_LIST), (val)=>{
                const value = Material.from(val);
                expect(value).toBeInstanceOf(Material);
                expect(value.value).toEqual(val);
            }));
        });
        it('should throw error when input not in enum', ()=>{
            fc.assert(fc.property(fc.string().filter((val)=>!MATERIAL_LIST.includes(val)), (status)=>{
                expect(()=>Material.from(status)).toThrow(/Invalid material/);
            }));
        });
    });
    describe('ConstructionType', ()=>{
        it('should return ConstructionType when input is valid', ()=>{
            fc.assert(fc.property(fc.constantFrom(...CONSTRUCTION_TYPE_LIST), (val)=>{
                const value = ConstructionType.from(val);
                expect(value).toBeInstanceOf(ConstructionType);
                expect(value.value).toEqual(val);
            }));
        });
        it('should throw error when input not in enum', ()=>{
            fc.assert(fc.property(fc.string().filter((val)=>!CONSTRUCTION_TYPE_LIST.includes(val)), (status)=>{
                expect(()=>ConstructionType.from(status)).toThrow(/Invalid construction type/);
            }));
        });
    });
});

//# sourceMappingURL=MasterType.spec.js.map