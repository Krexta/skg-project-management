import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { ContractStatus, WorkStatus } from "./index.js";
const WorkStatuses = [
    'NOT_STARTED',
    'DESIGN_IN_PROGRESS',
    'START_AT_NEXT_MONTH',
    'IN_PROGRESS_AT_SITE',
    'CONSTRUCTION_COMPLETE',
    'MONTHLY_REPORT_COMPLETE',
    'PAYMENT_RECEIVED',
    'ABORTED',
    'DELETED'
];
const ContractStatuses = [
    'NEW',
    'SIGNED',
    'CANCELED'
];
describe('Status', ()=>{
    describe('WorkStatus', ()=>{
        it('should return WorkStatus when input is valid', ()=>{
            fc.assert(fc.property(fc.constantFrom(...WorkStatuses), (status)=>{
                const value = WorkStatus.from(status);
                expect(value).toBeInstanceOf(WorkStatus);
                expect(value.value).toEqual(status);
            }));
        });
        it('should return NOT_STARTED when make new statue', ()=>{
            const value = WorkStatus.makeNotStartedStatus();
            expect(value).toBeInstanceOf(WorkStatus);
            expect(value.value).toEqual('NOT_STARTED');
        });
        it('should throw "invalid work status" when input not in enum', ()=>{
            fc.assert(fc.property(fc.string().filter((status)=>!WorkStatuses.includes(status)), (status)=>{
                expect(()=>WorkStatus.from(status)).toThrow(/invalid work status/);
            }));
        });
    });
    describe('ContractStatus', ()=>{
        it('should return ContractStatus when input is valid', ()=>{
            fc.assert(fc.property(fc.constantFrom(...ContractStatuses), (status)=>{
                const value = ContractStatus.from(status);
                expect(value).toBeInstanceOf(ContractStatus);
                expect(value.value).toEqual(status);
            }));
        });
        it('should return NEW when make new statue', ()=>{
            const value = ContractStatus.makeNewStatus();
            expect(value).toBeInstanceOf(ContractStatus);
            expect(value.value).toEqual('NEW');
        });
        it('should throw "invalid contract status" when input not in enum', ()=>{
            fc.assert(fc.property(fc.string().filter((status)=>!ContractStatuses.includes(status)), (status)=>{
                expect(()=>ContractStatus.from(status)).toThrow(/invalid contract status/);
            }));
        });
    });
});

//# sourceMappingURL=Status.spec.js.map