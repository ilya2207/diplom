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
class ModelService {
    static show(modelId) {
        return __awaiter(this, void 0, void 0, function* () {
            let models;
            if (modelId) {
                models = yield prisma_1.default.carModel.findMany({
                    where: {
                        id: +modelId,
                    },
                    select: {
                        id: true,
                        title: true,
                        brandModels: {
                            select: {
                                id: true,
                                title: true,
                                model: true,
                                brandId: true,
                                img: true,
                            },
                        },
                    },
                });
            }
            else {
                models = yield prisma_1.default.carModel.findMany({
                    where: {
                        brandId: null,
                    },
                    select: {
                        id: true,
                        title: true,
                        brandModels: {
                            select: {
                                id: true,
                                title: true,
                            },
                        },
                    },
                    orderBy: {
                        title: 'asc',
                    },
                });
            }
            return models;
        });
    }
    static add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newData = Object.assign(Object.assign({}, data), { brandId: typeof data.brandId === 'string' ? +data.brandId : null });
            const newModel = yield prisma_1.default.carModel.create({
                data: Object.assign({ img: process.env.MODEL_DEFAULT_IMAGE }, newData),
            });
            return newModel;
        });
    }
    static edit(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newData = Object.assign(Object.assign({}, data), { brandId: typeof data.brandId === 'string' ? +data.brandId : undefined });
            const newModel = yield prisma_1.default.carModel.update({
                where: {
                    id: +id,
                },
                data: newData,
            });
            return newModel;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedModel = yield prisma_1.default.carModel.delete({
                where: {
                    id,
                },
                select: {
                    img: true,
                },
            });
            return deletedModel;
        });
    }
}
exports.default = ModelService;
//# sourceMappingURL=model.service.js.map