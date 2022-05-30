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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = __importDefault(require("../../exceptions/api-error"));
const prisma_1 = __importDefault(require("../../prisma"));
class DetailService {
    static show(filterCondition, pagination, orderBy) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = pagination.page === 1 ? 0 : (pagination.page - 1) * pagination.items;
            const details = yield prisma_1.default.detail.findMany({
                skip,
                orderBy,
                take: pagination.items,
                where: filterCondition,
            });
            const totalCount = yield prisma_1.default.detail.count({
                where: filterCondition,
            });
            return { details, totalCount };
        });
    }
    static add(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let { models, categories, price } = body, otherBody = __rest(body, ["models", "categories", "price"]);
            const data = Object.assign(Object.assign({}, otherBody), { price: +price, models: {
                    connect: JSON.parse(models).map((item) => ({ id: item.id })),
                }, categories: {
                    connect: JSON.parse(categories).map((item) => ({ id: item.id })),
                } });
            const newDetail = yield prisma_1.default.detail.create({
                data,
            });
            return newDetail;
        });
    }
    static edit(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let { models, categories, price } = body, otherBody = __rest(body, ["models", "categories", "price"]);
            const data = Object.assign(Object.assign({}, otherBody), { price: +price, models: {
                    set: JSON.parse(models).map((item) => ({ id: item.id })),
                }, categories: {
                    set: JSON.parse(categories).map((item) => ({ id: item.id })),
                } });
            const newDetail = yield prisma_1.default.detail.update({
                where: {
                    id: +id,
                },
                data,
                include: {
                    categories: true,
                    models: true,
                },
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
    static searchDetail(searchStr, { page, items }) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = page === 1 ? 0 : (page - 1) * items;
            const where = {
                OR: [
                    {
                        title: {
                            contains: searchStr,
                        },
                    },
                    {
                        vendorCode: {
                            contains: searchStr,
                        },
                    },
                ],
            };
            const details = yield prisma_1.default.detail.findMany({
                skip,
                take: items,
                where,
            });
            const totalCount = yield prisma_1.default.detail.count({
                where: where,
            });
            return { details, totalCount };
        });
    }
    static generateSortObject(queryParams) {
        let filterCondition;
        const { modelId, categoryId, page = 1, items = 20, orderBy: sortBy } = queryParams;
        if (!modelId && !categoryId)
            throw api_error_1.default.badRequest('Укажите тип поиска');
        if (modelId && categoryId) {
            filterCondition = {
                categories: {
                    some: {
                        id: +categoryId,
                    },
                },
                models: {
                    some: {
                        id: +modelId,
                    },
                },
            };
        }
        else if (modelId) {
            filterCondition = {
                models: {
                    some: {
                        id: +modelId,
                    },
                },
            };
        }
        else if (categoryId) {
            filterCondition = {
                categories: {
                    some: {
                        id: +categoryId,
                    },
                },
            };
        }
        const pagination = { page: +page, items: +items };
        const orderBy = sortBy
            ? {
                price: sortBy,
            }
            : undefined;
        return [filterCondition, pagination, orderBy];
    }
    static getPopular() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prisma_1.default.detail.findMany({
                take: 10,
                orderBy: {
                    orderItems: {
                        _count: 'desc',
                    },
                },
            });
            return items;
        });
    }
    static getNew() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prisma_1.default.detail.findMany({
                take: 10,
                orderBy: {
                    id: 'desc',
                },
            });
            return items;
        });
    }
    static adminSearch(searchStr) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prisma_1.default.detail.findMany({
                where: {
                    OR: [
                        {
                            title: {
                                contains: searchStr,
                                mode: 'insensitive',
                            },
                        },
                        {
                            vendorCode: {
                                contains: searchStr,
                                mode: 'insensitive',
                            },
                        },
                    ],
                },
                orderBy: {
                    id: 'asc',
                },
                include: {
                    categories: true,
                    models: true,
                },
            });
            return items;
        });
    }
}
exports.default = DetailService;
//# sourceMappingURL=detail.service.js.map