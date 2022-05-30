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
orderRouter.get('/search', order_controller_1.default.searchByOrderNumber);
orderRouter.post('/', order_controller_1.default.add);
orderRouter.put('/:orderId', order_controller_1.default.edit);
orderRouter.delete('/:orderId', order_controller_1.default.delete);
exports.default = orderRouter;
//# sourceMappingURL=order.js.map