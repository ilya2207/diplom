"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_jwt_1 = require("express-jwt");
const basket_controller_1 = __importDefault(require("../handlers/basket/basket.controller"));
const basketRouter = (0, express_1.Router)();
basketRouter.use((0, express_jwt_1.expressjwt)({
    secret: process.env.JWT_ACCESS_SECRET,
    algorithms: ['HS256'],
}));
basketRouter.get('/', basket_controller_1.default.getBasket);
basketRouter.post('/', basket_controller_1.default.addBasketItem);
basketRouter.put('/', basket_controller_1.default.editBasketItem);
basketRouter.delete('/:itemId', basket_controller_1.default.deleteBasketItem);
basketRouter.delete('/', basket_controller_1.default.deleteBasketItemsAll);
exports.default = basketRouter;
//# sourceMappingURL=basket.js.map