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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDetails = exports.createDetailsByCyArray = void 0;
const client_1 = require("@prisma/client");
const fs_1 = require("fs");
const prisma = new client_1.PrismaClient();
const createDetailsByCyArray = (items, categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    for (const item of items) {
        yield prisma.detail.create({
            data: Object.assign(Object.assign({}, item), { categories: {
                    connect: {
                        id: categoryId,
                    },
                } }),
        });
    }
});
exports.createDetailsByCyArray = createDetailsByCyArray;
const createDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(__dirname + '/' + 'details.json');
    const readDetails = (0, fs_1.readFileSync)(__dirname + '/' + 'details-new.json');
    //@ts-expect-error
    const parsedData = JSON.parse(readDetails);
    // await Promise.all(
    //   Object.values(parsedData).map((item: IDetailSeed) => {
    //     return createDetailsByCyArray(item.items, +item.category_id)
    //   })
    // )
    const items = Object.values(parsedData);
    for (const item of items) {
        yield (0, exports.createDetailsByCyArray)(item.items, +item.category_id);
    }
    // Object.values(parsedData).forEach(async (item: IDetailSeed) => {
    //   console.log(item)
    //   await Promise.all(
    //     item.items.map((element) => {
    //       return prisma.detail.create({
    //         data: {
    //           ...element,
    //           categories: {
    //             connect: {
    //               id: +item.category_id,
    //             },
    //           },
    //         },
    //       })
    //     })
    //   )
    // })
});
exports.createDetails = createDetails;
//# sourceMappingURL=detail.seed.js.map