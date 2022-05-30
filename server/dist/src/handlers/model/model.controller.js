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
const prisma_1 = __importDefault(require("../../prisma"));
const image_service_1 = __importDefault(require("../image/image.service"));
const model_service_1 = __importDefault(require("./model.service"));
class ModelController {
    static show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelId = req.params.modelId;
                const models = yield model_service_1.default.show(+modelId);
                return res.json(models);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static add(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.img;
                if (file) {
                    const newImgPath = yield image_service_1.default.upload('model', file);
                    body.img = newImgPath;
                }
                const newModel = yield model_service_1.default.add(body);
                return res.json(newModel);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static edit(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelId = req.params.modelId;
                const body = req.body;
                const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.img;
                if (file) {
                    const modelFromDb = yield prisma_1.default.carModel.findUnique({
                        where: {
                            id: +modelId,
                        },
                        select: {
                            img: true,
                        },
                    });
                    const imgPath = yield image_service_1.default.update('model', file, modelFromDb.img);
                    body.img = imgPath;
                }
                const newModel = yield model_service_1.default.edit(+modelId, body);
                return res.json(newModel);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelId = req.params.modelId;
                const deletedModel = yield model_service_1.default.delete(+modelId);
                yield image_service_1.default.delete(deletedModel.img);
                return res.json({ message: 'Успешно удалено' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchStr = req.query.searchStr;
                const items = yield model_service_1.default.search(searchStr);
                return res.json(items);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = ModelController;
//# sourceMappingURL=model.controller.js.map