import { BaseValueObject } from "../base.js";
export const WORK_STATUS_LIST = [
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
export const CONTRACT_STATUS_LIST = [
    'NEW',
    'SIGNED',
    'CANCELED'
];
export class WorkStatus extends BaseValueObject {
    static from(value) {
        return new WorkStatus(value);
    }
    static makeNotStartedStatus() {
        return new WorkStatus('NOT_STARTED');
    }
    static makeDeletedStatus() {
        return new WorkStatus('DELETED');
    }
    validate(value) {
        if (!WORK_STATUS_LIST.includes(value)) {
            throw new Error('invalid work status');
        }
        return value;
    }
    constructor(value){
        super(value);
    }
}
export class ContractStatus extends BaseValueObject {
    static from(value) {
        return new ContractStatus(value);
    }
    static makeNewStatus() {
        return new ContractStatus('NEW');
    }
    validate(value) {
        if (!CONTRACT_STATUS_LIST.includes(value)) {
            throw new Error('invalid contract status');
        }
        return value;
    }
    constructor(value){
        super(value);
    }
}

//# sourceMappingURL=Status.js.map