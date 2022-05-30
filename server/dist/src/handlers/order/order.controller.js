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
const basket_service_1 = __importDefault(require("../basket/basket.service"));
const order_service_1 = __importDefault(require("./order.service"));
class OrderController {
    static show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: userId } = req.auth.payload;
                const orders = yield order_service_1.default.show(userId);
                return res.json(orders);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: userId } = req.auth.payload;
                const basketItems = yield basket_service_1.default.getAllItemsByUserId(userId);
                if (basketItems.basketItems.length === 0)
                    next(api_error_1.default.badRequest('Корзина пуста'));
                const order = yield order_service_1.default.createOrder(basketItems, userId);
                yield basket_service_1.default.deleteBasketItemsByBasketId(basketItems.basketId);
                return res.json(order);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = req.params.orderId;
                const body = req.body;
                const updatedOrder = yield order_service_1.default.edit(+orderId, body);
                return res.json(updatedOrder);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = req.params.orderId;
                yield order_service_1.default.delete(+orderId);
                return res.json('Успешно');
            }
            catch (error) {
                next(error);
            }
        });
    }
    static searchByOrderNumber(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { orderNumber } = req.query;
                const searchedItems = yield order_service_1.default.searchByOrderNumber(orderNumber.toString());
                return res.json(searchedItems);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = OrderController;
//# sourceMappingURL=order.controller.js.map