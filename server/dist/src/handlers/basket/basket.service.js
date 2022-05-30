'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const prisma_1 = __importDefault(require('../../prisma'))
class BasketService {
  static createBasket(userId) {
    return __awaiter(this, void 0, void 0, function* () {
      const newBasket = yield prisma_1.default.basket.create({
        data: {
          userId,
        },
      })
      return newBasket
    })
  }
  static getBasketByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
      const basket = yield prisma_1.default.basket.findUnique({
        where: {
          userId,
        },
        select: {
          id: true,
        },
      })
      return basket.id
    })
  }
  static addBasketItem(item, basketId) {
    return __awaiter(this, void 0, void 0, function* () {
      const isItemExists = yield prisma_1.default.basket.findUnique({
        where: {
          id: basketId,
        },
        select: {
          basketItems: {
            where: {
              detailId: item.detailId,
            },
          },
        },
      })
      if (isItemExists.basketItems.length !== 0) {
        const newItem = yield prisma_1.default.basketItem.update({
          where: {
            id: isItemExists.basketItems[0].id,
          },
          data: {
            amount: {
              increment: item.amount,
            },
          },
        })
        return newItem
      }
      const newItem = yield prisma_1.default.basketItem.create({
        data: Object.assign(Object.assign({}, item), { basketId }),
      })
      return newItem
    })
  }
  static getBasket(userId) {
    return __awaiter(this, void 0, void 0, function* () {
      const basket = yield prisma_1.default.basket.findUnique({
        where: {
          userId,
        },
        select: {
          basketItems: {
            orderBy: {
              id: 'asc',
            },
            select: {
              amount: true,
              id: true,
              detail: {
                select: {
                  id: true,
                  img: true,
                  price: true,
                  title: true,
                },
              },
            },
          },
        },
      })
      return basket
    })
  }
  static editBasketItem(basketItemId, basket) {
    return __awaiter(this, void 0, void 0, function* () {
      const newItem = yield prisma_1.default.basketItem.update({
        where: {
          id: basketItemId,
        },
        data: basket,
      })
      return newItem
    })
  }
  static deleteBasketItem(basketItemId) {
    return __awaiter(this, void 0, void 0, function* () {
      const newItem = yield prisma_1.default.basketItem.delete({
        where: {
          id: basketItemId,
        },
      })
      return newItem
    })
  }
  static getAllItemsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
      const basketId = yield this.getBasketByUserId(userId)
      const basketItems = yield prisma_1.default.basketItem.findMany({
        where: {
          basketId,
        },
        select: {
          amount: true,
          detailId: true,
          detail: {
            select: {
              price: true,
            },
          },
        },
      })
      return { basketItems, basketId }
    })
  }
  static deleteBasketItemsByBasketId(basketId) {
    return __awaiter(this, void 0, void 0, function* () {
      const items = yield prisma_1.default.basketItem.deleteMany({
        where: {
          basketId,
        },
      })
      return items
    })
  }
}
exports.default = BasketService
//# sourceMappingURL=basket.service.js.map
