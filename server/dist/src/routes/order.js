"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = __importDefault(require("../handlers/order/order.controller"));
const orderRouter = (0, express_1.Router)();
orderRouter.get('/:detailId', order_controller_1.default.show);
orderRouter.post('/:detailId', order_controller_1.default.show);
orderRouter.post('/:detailId', order_controller_1.default.show);
exports.default = orderRouter;
//# sourceMappingURL=order.js.map