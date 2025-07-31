import { format } from "date-fns";
import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { ContractStatus, DATETIME_VALUE_FORMAT, DatetimeValue, ProjectContractStatusId, ProjectId, ProjectStopFlag, StatusReason } from "../value/index.js";
import { ProjectContractStatus } from "./ProjectContractStatus.js";
const ContractStatuses = [
    'NEW',
    'SIGNED',
    'CANCELED'
];
describe('ProjectContractStatus', ()=>{
    it('should return ProjectContractStatus when input is valid', ()=>{
        fc.assert(fc.property(fc.record({
            projectContractStatusId: fc.uuid({
                version: 7
            }),
            isProjectStop: fc.boolean(),
            projectId: fc.uuid({
                version: 7
            }),
            statusName: fc.constantFrom(...ContractStatuses),
            statusReason: fc.string({
                minLength: 1
            }),
            statusTimestamp: fc.date({
                min: new Date(0),
                max: new Date(9999, 11, 31)
            })
        }).filter(({ statusReason })=>statusReason.trim().length > 1).map(({ projectContractStatusId, isProjectStop, projectId, statusName, statusReason, statusTimestamp })=>({
                projectContractStatusId: ProjectContractStatusId.from(projectContractStatusId),
                isProjectStop: ProjectStopFlag.from(isProjectStop),
                projectId: ProjectId.from(projectId),
                statusName: ContractStatus.from(statusName),
                statusReason: StatusReason.from(statusReason),
                statusTimestamp: DatetimeValue.from(format(statusTimestamp, DATETIME_VALUE_FORMAT))
            })), (args)=>{
            const value = new ProjectContractStatus(args);
            expect(value).toBeInstanceOf(ProjectContractStatus);
            expect(value).toEqual(args);
        }));
    });
});

//# sourceMappingURL=ProjectContractStatus.spec.js.map