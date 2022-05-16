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
const basket_service_1 = __importDefault(require("./basket.service"));
class BasketController {
    static getBasket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: userId } = req.auth.payload;
                const basket = yield basket_service_1.default.getBasket(+userId);
                return res.json(basket);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static addBasketItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: userId } = req.auth.payload;
                const basketItem = req.body;
                const userBasketId = yield basket_service_1.default.getBasketByUserId(userId);
                const newBasketItem = yield basket_service_1.default.addBasketItem(basketItem, userBasketId);
                return res.json(newBasketItem);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static editBasketItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const basketItem = req.body;
                const newBasketItem = yield basket_service_1.default.editBasketItem(basketItem.id, basketItem);
                return res.json(newBasketItem);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteBasketItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const basketItemId = req.params.itemId;
                const deletedBasketItem = yield basket_service_1.default.deleteBasketItem(+basketItemId);
                return res.json('Успешно');
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteBasketItemsAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: userId } = req.auth.payload;
                const basketId = yield basket_service_1.default.getBasketByUserId(userId);
                yield basket_service_1.default.deleteBasketItemsByBasketId(basketId);
                return res.json('Успешно');
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = BasketController;
//# sourceMappingURL=basket.controller.js.map