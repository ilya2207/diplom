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
class DetailService {
    static show(type, query, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = pagination.page === 1 ? 0 : (pagination.page - 1) * pagination.items;
            const isTypeKey = type === 'categoryId' || type === 'modelId' ? { [type]: query } : false;
            const whereCondition = isTypeKey
                ? isTypeKey
                : type === 'both' && typeof query === 'object'
                    ? query
                    : null;
            if (!whereCondition)
                throw api_error_1.default.badRequest('Запрос некорректный');
            const details = yield prisma_1.default.detail.findMany({
                skip,
                take: pagination.items,
                where: whereCondition,
            });
            return details;
        });
    }
    static add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDetail = yield prisma_1.default.detail.create({
                data,
            });
            return newDetail;
        });
    }
    static edit(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDetail = yield prisma_1.default.detail.update({
                where: {
                    id: +id,
                },
                data,
            });
            return newDetail;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.default.detail.delete({
                where: {
                    id,
                },
            });
        });
    }
    static updateStar(id, star) {
        return __awaiter(this, void 0, void 0, function* () {
            const detail = yield prisma_1.default.detail.findUnique({
                where: {
                    id,
                },
                include: {
                    _count: {
                        select: {
                            reviews: true,
                        },
                    },
                },
            });
            const starCount = detail._count.reviews;
            const newStar = ((starCount - 1) * detail.star + star) / starCount;
            yield prisma_1.default.detail.update({
                where: {
                    id,
                },
                data: {
                    star: newStar,
                },
            });
        });
    }
}
exports.default = DetailService;
//# sourceMappingURL=detail.service.js.map