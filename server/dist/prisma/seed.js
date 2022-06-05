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
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const categories_1 = require("./seeds/categories");
const detail_seed_1 = require("./seeds/details/detail.seed");
const prisma = new client_1.PrismaClient();
const createAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const password = yield bcrypt_1.default.hash('admin', 3);
    yield prisma.user.create({
        data: {
            firstname: 'Admin',
            secondname: '',
            lastname: '',
            email: 'admin@mail.ru',
            phone: 'admin',
            type: 'admin',
            password,
            basket: {
                create: {},
            },
        },
    });
});
const createDetail = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 1; i <= 100; i++) {
        yield prisma.detail.create({
            data: {
                price: i * 1000,
                title: `Поршень ${i}`,
                categories: {
                    connect: [{ id: 2 }],
                },
            },
        });
    }
    for (let i = 1; i <= 100; i++) {
        yield prisma.detail.create({
            data: {
                price: i * 1000,
                title: `Браслет ${i}`,
                categories: {
                    connect: [{ id: 3 }],
                },
            },
        });
    }
});
const createCarModels = () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.carModel.create({
        data: {
            title: 'Mercedes',
            brandModels: {
                create: [
                    { title: 'Кабан', model: 'W13' },
                    { title: 'GLE', model: 'S14' },
                ],
            },
        },
    });
});
const createCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    // await prisma.category.create({
    //   data: {
    //     title: 'Масла и технические жидкости',
    //     childCategories: {
    //       create: [
    //         { title: 'Моторное масло' },
    //         { title: 'Гидравлическая жидкость' },
    //         { title: 'Тормозная жидкость' },
    //         { title: 'Антифризы' },
    //         { title: 'Трансмиссионное масло' },
    //       ],
    //     },
    //   },
    // })
    for (const item of categories_1.seedCategoriesList) {
        yield prisma.category.create({
            data: item,
        });
    }
    // seedCategoriesList.forEach(
    //   async (item) =>
    //     await prisma.category.create({
    //       data: item,
    //     })
    // )
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // await createAdmin()
    // await createDetail()
    // await createCategories()
    yield (0, detail_seed_1.createDetails)();
});
main()
    .then(() => console.log('Seed Success'))
    .catch((e) => {
    console.log(e);
})
    .finally(() => {
    prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map