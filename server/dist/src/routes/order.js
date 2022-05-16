"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_jwt_1 = require("express-jwt");
const order_controller_1 = __importDefault(require("../handlers/order/order.controller"));
const orderRouter = (0, express_1.Router)();
orderRouter.use((0, express_jwt_1.expressjwt)({
    secret: process.env.JWT_ACCESS_SECRET,
    algorithms: ['HS256'],
}));
orderRouter.get('/', order_controller_1.default.show);
orderRouter.post('/', order_controller_1.default.add);
// orderRouter.post('/:detailId', OrderController.show)
exports.default = orderRouter;
//# sourceMappingURL=order.js.map