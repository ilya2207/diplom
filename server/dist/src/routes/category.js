"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = require("express");
const express_jwt_1 = require("express-jwt");
const category_controller_1 = __importDefault(require("../handlers/category/category.controller"));
const admin_middleware_1 = __importDefault(require("../middlewares/admin.middleware"));
const categoryRouter = (0, express_1.Router)();
categoryRouter.get('/', category_controller_1.default.show);
categoryRouter.use((0, express_jwt_1.expressjwt)({
    secret: process.env.JWT_ACCESS_SECRET,
    algorithms: ['HS256'],
}));
categoryRouter.use(admin_middleware_1.default);
categoryRouter.post('/', category_controller_1.default.add);
categoryRouter.put('/:categoryId', category_controller_1.default.edit);
categoryRouter.delete('/:categoryId', category_controller_1.default.delete);
exports.default = categoryRouter;
//# sourceMappingURL=category.js.map