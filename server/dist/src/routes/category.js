"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = __importDefault(require("../handlers/category/category.controller"));
const categoryRouter = (0, express_1.Router)();
categoryRouter.get('/', category_controller_1.default.show);
// categoryRouter.use(
//   expressjwt({
//     secret: process.env.JWT_ACCESS_SECRET,
//     algorithms: ['HS256'],
//   })
// )
// categoryRouter.use(adminMiddleware)
categoryRouter.post('/', category_controller_1.default.add);
categoryRouter.put('/:categoryId', category_controller_1.default.edit);
categoryRouter.delete('/:categoryId', category_controller_1.default.delete);
exports.default = categoryRouter;
//# sourceMappingURL=category.js.map