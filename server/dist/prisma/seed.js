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
    for (let i = 201; i < 210; i++) {
        yield prisma.detail.create({
            data: {
                price: i * 1000,
                shortDescription: `Номер ${i * 20}`,
                title: `Поршень ${i}`,
                models: {
                    connect: [{ id: 2 }, { id: 16 }],
                },
                categories: {
                    connect: [{ id: 96 }],
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
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield createAdmin();
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