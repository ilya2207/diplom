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
const category_service_1 = __importDefault(require("./category.service"));
class CategoryController {
    static add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const newCategory = yield category_service_1.default.add(body);
                return res.json(newCategory);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const id = req.params.categoryId;
                const category = yield category_service_1.default.edit(+id, body);
                return res.json(category);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.categoryId;
                const category = yield category_service_1.default.delete(+id);
                console.log(category);
                return res.json({ message: 'Успешно удалено', id });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static show(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield category_service_1.default.show();
                return res.json(categories);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = CategoryController;
//# sourceMappingURL=category.controller.js.map