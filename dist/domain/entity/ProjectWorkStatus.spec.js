import { format } from "date-fns";
import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { DATETIME_VALUE_FORMAT, DatetimeValue, ProjectId, ProjectStopFlag, ProjectWorkStatusId, StatusReason, WorkStatus } from "../value/index.js";
import { ProjectWorkStatus } from "./ProjectWorkStatus.js";
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
describe('ProjectWorkStatus', ()=>{
    it('should return ProjectWorkStatus when input is valid', ()=>{
        fc.assert(fc.property(fc.record({
            projectWorkStatusId: fc.uuid({
                version: 7
            }),
            isProjectStop: fc.boolean(),
            projectId: fc.uuid({
                version: 7
            }),
            statusName: fc.constantFrom(...WorkStatuses),
            statusReason: fc.string({
                minLength: 1
            }),
            statusTimestamp: fc.date({
                min: new Date(0),
                max: new Date(9999, 11, 31)
            })
        }).filter(({ statusReason })=>statusReason.trim().length > 1).map(({ projectWorkStatusId, isProjectStop, projectId, statusName, statusReason, statusTimestamp })=>({
                projectWorkStatusId: ProjectWorkStatusId.from(projectWorkStatusId),
                isProjectStop: ProjectStopFlag.from(isProjectStop),
                projectId: ProjectId.from(projectId),
                statusName: WorkStatus.from(statusName),
                statusReason: StatusReason.from(statusReason),
                statusTimestamp: DatetimeValue.from(format(statusTimestamp, DATETIME_VALUE_FORMAT))
            })), (args)=>{
            const value = new ProjectWorkStatus(args);
            expect(value).toBeInstanceOf(ProjectWorkStatus);
            expect(value).toEqual(args);
        }));
    });
});

//# sourceMappingURL=ProjectWorkStatus.spec.js.map