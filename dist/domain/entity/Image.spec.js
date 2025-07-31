import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { CreatedUserId, ImageId, ImagePath, ProjectId } from "../value/index.js";
import { Image } from "./index.js";
describe('Image', ()=>{
    it('should return Image when input is valid', ()=>{
        fc.assert(fc.property(fc.record({
            imageId: fc.uuid({
                version: 7
            }),
            imagePath: fc.stringMatching(/(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/),
            projectId: fc.uuid({
                version: 7
            }),
            createdUserId: fc.uuid({
                version: 7
            })
        }).map(({ imageId, imagePath, projectId, createdUserId })=>({
                imageId: ImageId.from(imageId),
                imagePath: ImagePath.from(imagePath),
                projectId: ProjectId.from(projectId),
                createdUserId: CreatedUserId.from(createdUserId)
            })), (args)=>{
            const value = new Image(args);
            expect(value).toBeInstanceOf(Image);
            expect(value).toEqual(args);
        }));
    });
});

//# sourceMappingURL=Image.spec.js.map