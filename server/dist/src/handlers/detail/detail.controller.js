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
const detail_service_1 = __importDefault(require("./detail.service"));
class DetailController {
    static show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [filterCondition, pagination, orderBy] = detail_service_1.default.generateSortObject(req.query);
                const responseItems = yield detail_service_1.default.show(filterCondition, pagination, orderBy);
                return res.json(responseItems);
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
    // static async disconnectDetail(req: Request, res: Response, next: NextFunction) {
    //   try {
    //     const { detailId, typeId, type } = req.params as {
    //       detailId: string
    //       type: 'model' | 'category'
    //       typeId: string
    //     }
    //     const result = await DetailService.disconnectDetail(+detailId, type, +typeId)
    //     return res.json(result)
    //   } catch (error) {
    //     next(error)
    //   }
    // }
    static edit(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const detailId = req.params.detailId;
                const body = req.body;
                const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.img;
                if (file) {
                    const detailFromDb = yield prisma_1.default.detail.findUnique({
                        where: {
                            id: +detailId,
                        },
                        select: {
                            img: true,
                        },
                    });
                    const imgPath = yield image_service_1.default.update('detail', file, detailFromDb.img);
                    body.img = imgPath;
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
    static search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { searchStr, page = 1, items = 20 } = req.query;
                const pagination = { page: +page, items: +items };
                const details = yield detail_service_1.default.searchDetail(searchStr.toString(), pagination);
                return res.json(details);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getPopular(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield detail_service_1.default.getPopular();
                return res.json(items);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getNew(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield detail_service_1.default.getNew();
                return res.json(items);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static adminSearch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchStr = req.query.searchStr;
                const items = yield detail_service_1.default.adminSearch(searchStr);
                return res.json(items);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = DetailController;
//# sourceMappingURL=detail.controller.js.map