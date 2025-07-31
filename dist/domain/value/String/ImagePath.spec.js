import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { ImagePath } from "./ImagePath.js";
describe('ImagePath', ()=>{
    it('should return ImagePath when input is valid', ()=>{
        fc.assert(fc.property(fc.option(fc.stringMatching(/(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/)), (imagePath)=>{
            const value = ImagePath.from(imagePath);
            expect(value).toBeInstanceOf(ImagePath);
            expect(value.value).toEqual(imagePath);
        }));
    });
    it('should throw "ImagePath has maximum length of 400" when input too long string', ()=>{
        fc.assert(fc.property(fc.string({
            minLength: 401
        }).map((imagePath)=>imagePath.trim()), (imagePath)=>{
            fc.pre(imagePath.length > 400);
            expect(()=>ImagePath.from(imagePath)).toThrow(/ImagePath has maximum length of 400/);
        }));
    });
});

//# sourceMappingURL=ImagePath.spec.js.map