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
const api_error_1 = __importDefault(require("../../exceptions/api-error"));
const prisma_1 = __importDefault(require("../../prisma"));
const image_service_1 = __importDefault(require("../image/image.service"));
const detail_service_1 = __importDefault(require("./detail.service"));
class DetailController {
    static show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseItems = [];
                const { modelId, categoryId, page = 1, items = 20 } = req.query;
                const pagination = { page: +page, items: +items };
                if (modelId && categoryId) {
                    responseItems = yield detail_service_1.default.show('both', {
                        modelId: +modelId,
                        categoryId: +categoryId,
                    }, pagination);
                }
                else if (modelId) {
                    responseItems = yield detail_service_1.default.show('modelId', +modelId, pagination);
                }
                else if (categoryId) {
                    responseItems = yield detail_service_1.default.show('categoryId', +categoryId, pagination);
                }
                else
                    throw api_error_1.default.badRequest('Укажите тип поиска');
                return res.json(responseItems);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static add(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                body.price = +body.price;
                body.star = +body.star;
                body.categoryId = +body.categoryId;
                body.options = (_a = body.options) !== null && _a !== void 0 ? _a : '';
                const file = (_b = req.files) === null || _b === void 0 ? void 0 : _b.img;
                if (file) {
                    const newImgPath = yield image_service_1.default.upload('detail', file);
                    body.img = newImgPath;
                }
                const newDetail = yield detail_service_1.default.add(body);
                return res.json(newDetail);
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
                const detailId = req.params.detailId;
                const body = req.body;
                const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.img;
                if (file) {
                    const detailFromDb = yield prisma_1.default.carModel.findUnique({
                        where: {
                            id: +detailId,
                        },
                        select: {
                            img: true,
                        },
                    });
                    if (detailFromDb.img === process.env.DETAIL_DEFAULT_IMAGE || !detailFromDb.img) {
                        const imgPath = yield image_service_1.default.upload('model', file);
                        body.img = imgPath;
                    }
                    else {
                        yield image_service_1.default.update(detailFromDb.img, file);
                    }
                }
                const newModel = yield detail_service_1.default.edit(detailId, body);
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
                const detailId = req.params.detailId;
                yield detail_service_1.default.delete(+detailId);
                return res.json({ message: 'Успешно удалено' });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = DetailController;
//# sourceMappingURL=detail.controller.js.map