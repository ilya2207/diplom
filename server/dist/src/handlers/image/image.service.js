"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const api_error_1 = __importDefault(require("../../exceptions/api-error"));
class ImageService {
    static generatePathToDb(fileName, folder) {
        return `/images/${folder}/${Date.now()}${fileName}`;
    }
    static upload(folder, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const imgPathtoDb = this.generatePathToDb(file.name, folder);
            const path = `${process.cwd()}${imgPathtoDb}`;
            file.mv(path);
            return imgPathtoDb;
        });
    }
    // static async findImgId(id: number, type: ImageRelativeType): Promise<Image> {
    //   let img: Image
    //   if (type === 'detail') {
    //     const imageFromDb = await prisma.detail.findUnique({
    //       where: {
    //         id,
    //       },
    //       select: {
    //         img: true,
    //       },
    //     })
    //     img = imageFromDb.img
    //   } else if (type === 'model') {
    //     const imageFromDb = await prisma.carModel.findUnique({
    //       where: {
    //         id,
    //       },
    //       select: {
    //         img: true,
    //       },
    //     })
    //     img = imageFromDb.img
    //   }
    //   return img
    // }
    static update(folder, file, oldFilePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const pathToDb = this.generatePathToDb(file.name, folder);
            const path = `${process.cwd()}${pathToDb}`;
            file.mv(path);
            if (oldFilePath !== process.env.MODEL_DEFAULT_IMAGE &&
                oldFilePath !== process.env.DETAIL_DEFAULT_IMAGE) {
                (0, fs_1.unlink)(`${process.cwd()}${oldFilePath}`, (err) => {
                    if (err)
                        api_error_1.default.someError();
                });
            }
            return pathToDb;
        });
    }
    static delete(pathfromDb) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = `${process.cwd()}${pathfromDb}`;
            (0, fs_1.unlink)(path, (error) => {
                console.error(error);
            });
        });
    }
}
exports.default = ImageService;
//# sourceMappingURL=image.service.js.map