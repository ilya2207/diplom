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
class CategoryService {
    static show() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield prisma_1.default.category.findMany({
                where: {
                    parentCategoryId: null,
                },
                select: {
                    id: true,
                    title: true,
                    childCategories: {
                        select: {
                            id: true,
                            title: true,
                        },
                        orderBy: {
                            id: 'asc',
                        },
                    },
                },
                orderBy: {
                    id: 'asc',
                },
            });
            return categories;
        });
    }
    static add(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCategory = yield prisma_1.default.category.create({
                data: category,
            });
            return newCategory;
        });
    }
    static edit(id, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCategory = yield prisma_1.default.category.update({
                where: {
                    id,
                },
                data: category,
            });
            return newCategory;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCategory = yield prisma_1.default.category.delete({
                where: {
                    id,
                },
            });
            return deletedCategory;
        });
    }
    static search(searchStr) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prisma_1.default.category.findMany({
                where: {
                    AND: [{ NOT: { parentCategory: null } }, { title: { contains: searchStr } }],
                },
            });
            return items;
        });
    }
}
exports.default = CategoryService;
//# sourceMappingURL=category.service.js.map