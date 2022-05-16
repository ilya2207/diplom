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
class OrderService {
    static show(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield prisma_1.default.order.findMany({
                where: {
                    userId,
                },
                include: {
                    orderItems: {
                        include: {
                            detail: true,
                        },
                    },
                },
            });
            return orders;
        });
    }
    static createOrder(basketData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderItems = {
                createMany: { data: [] },
            };
            let totalPrice = 0;
            for (let index = 0; index < basketData.basketItems.length; index++) {
                const { amount, detailId, detail: { price }, } = basketData.basketItems[index];
                totalPrice += amount * price;
                orderItems.createMany.data.push({
                    amount,
                    detailId,
                });
            }
            const orderNumber = `${Math.random().toString().slice(-8)}`;
            const order = yield prisma_1.default.order.create({
                data: {
                    totalPrice,
                    userId,
                    orderItems,
                    orderNumber,
                },
            });
            return order;
        });
    }
    static edit() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static delete() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = OrderService;
//# sourceMappingURL=order.service.js.map