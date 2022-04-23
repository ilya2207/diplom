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
    static show() {
        return __awaiter(this, void 0, void 0, function* () {
            const models = yield prisma_1.default.carModel.findMany({
                where: {
                    brandId: null,
                },
                include: {
                    brandModels: true,
                },
            });
            return models;
        });
    }
    static add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newModel = yield prisma_1.default.carModel.create({
                data: data,
            });
            return newModel;
        });
    }
    static edit(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newModel = yield prisma_1.default.carModel.update({
                where: {
                    id,
                },
                data: data,
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
            });
        });
    }
}
exports.default = ModelService;
//# sourceMappingURL=model.service.js.map