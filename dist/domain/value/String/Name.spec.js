import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { ConstructionTypeName, MaterialName, ProjectContractTypeName, ProjectName, ProjectTypeName } from "./Name.js";
describe('Name', ()=>{
    describe('ProjectName', ()=>{
        it('Should return ProjectName when input is valid', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 1,
                maxLength: 256
            }).map((name)=>name.trim()), (name)=>{
                fc.pre(name.length > 1 && name.length < 257);
                const value = ProjectName.from(name);
                expect(value).toBeInstanceOf(ProjectName);
                expect(value.value).toEqual(name);
            }));
        });
        it('Should throw "ProjectName has maximum length of 256" name when input too long string', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 257
            }).map((name)=>name.trim()), (name)=>{
                fc.pre(name.length > 256);
                expect(()=>{
                    ProjectName.from(name);
                }).toThrow(/ProjectName has maximum length of 256/);
            }));
        });
        it('Should throw "ProjectName must not be empty" when input empty string', ()=>{
            fc.assert(fc.property(fc.constantFrom('', ' ', '　'), (name)=>{
                expect(()=>{
                    ProjectName.from(name);
                }).toThrow(/ProjectName must not be empty/);
            }));
        });
    });
    describe('ProjectTypeName', ()=>{
        it('Should return ProjectTypeName when input is valid', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 1,
                maxLength: 45
            }).map((name)=>name.trim()), (name)=>{
                fc.pre(name.length > 1 && name.length < 46);
                const value = ProjectTypeName.from(name);
                expect(value).toBeInstanceOf(ProjectTypeName);
                expect(value.value).toEqual(name);
            }));
        });
        it('Should throw "ProjectTypeName has maximum length of 45" name when input too long string', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 46
            }).map((name)=>name.trim()), (name)=>{
                fc.pre(name.length > 45);
                expect(()=>{
                    ProjectTypeName.from(name);
                }).toThrow(/ProjectTypeName has maximum length of 45/);
            }));
        });
        it('Should throw "ProjectTypeName must not be empty" when input empty string', ()=>{
            fc.assert(fc.property(fc.constantFrom('', ' ', '　'), (name)=>{
                expect(()=>{
                    ProjectTypeName.from(name);
                }).toThrow(/ProjectTypeName must not be empty/);
            }));
        });
    });
    describe('ProjectContractTypeName', ()=>{
        it('Should return ProjectContractTypeName when input is valid', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 1,
                maxLength: 45
            }).map((name)=>name.trim()), (name)=>{
                fc.pre(name.length > 1 && name.length < 46);
                const value = ProjectContractTypeName.from(name);
                expect(value).toBeInstanceOf(ProjectContractTypeName);
                expect(value.value).toEqual(name);
            }));
        });
        it('Should throw "ProjectContractTypeName has maximum length of 45" name when input too long string', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 46
            }).map((name)=>name.trim()), (name)=>{
                fc.pre(name.length > 45);
                expect(()=>{
                    ProjectContractTypeName.from(name);
                }).toThrow(/ProjectContractTypeName has maximum length of 45/);
            }));
        });
        it('Should throw "ProjectContractTypeName must not be empty" when input empty string', ()=>{
            fc.assert(fc.property(fc.constantFrom('', ' ', '　'), (name)=>{
                expect(()=>{
                    ProjectContractTypeName.from(name);
                }).toThrow(/ProjectContractTypeName must not be empty/);
            }));
        });
    });
    describe('MaterialName', ()=>{
        it('Should return MaterialName when input is valid', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 1,
                maxLength: 256
            }).map((name)=>name.trim()), (name)=>{
                fc.pre(name.length > 1 && name.length < 257);
                const value = MaterialName.from(name);
                expect(value).toBeInstanceOf(MaterialName);
                expect(value.value).toEqual(name);
            }));
        });
        it('Should throw "MaterialName has maximum length of 256" name when input too long string', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 257
            }).map((name)=>name.trim()), (name)=>{
                fc.pre(name.length > 256);
                expect(()=>{
                    MaterialName.from(name);
                }).toThrow(/MaterialName has maximum length of 256/);
            }));
        });
        it('Should throw "MaterialName must not be empty" when input empty string', ()=>{
            fc.assert(fc.property(fc.constantFrom('', ' ', '　'), (name)=>{
                expect(()=>{
                    MaterialName.from(name);
                }).toThrow(/MaterialName must not be empty/);
            }));
        });
    });
    describe('ConstructionTypeName', ()=>{
        it('Should return ConstructionTypeName when input is valid', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 1,
                maxLength: 50
            }).map((name)=>name.trim()), (name)=>{
                fc.pre(name.length > 1 && name.length < 51);
                const value = ConstructionTypeName.from(name);
                expect(value).toBeInstanceOf(ConstructionTypeName);
                expect(value.value).toEqual(name);
            }));
        });
        it('Should throw "ConstructionTypeName has maximum length of 50" name when input too long string', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 51
            }).map((name)=>name.trim()), (name)=>{
                fc.pre(name.length > 50);
                expect(()=>{
                    ConstructionTypeName.from(name);
                }).toThrow(/ConstructionTypeName has maximum length of 50/);
            }));
        });
        it('Should throw "ConstructionTypeName must not be empty" when input empty string', ()=>{
            fc.assert(fc.property(fc.constantFrom('', ' ', '　'), (name)=>{
                expect(()=>{
                    ConstructionTypeName.from(name);
                }).toThrow(/ConstructionTypeName must not be empty/);
            }));
        });
    });
});

//# sourceMappingURL=Name.spec.js.map