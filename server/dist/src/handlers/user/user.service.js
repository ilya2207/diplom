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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_dto_1 = __importDefault(require("./user.dto"));
const prisma_1 = __importDefault(require("../../prisma"));
const api_error_1 = __importDefault(require("../../exceptions/api-error"));
class UserService {
    static show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.user.findUnique({
                where: {
                    id,
                },
                select: {
                    firstname: true,
                    secondname: true,
                    lastname: true,
                    email: true,
                    phone: true,
                    type: true,
                },
            });
            return user;
        });
    }
    static signup(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phone, email, password, firstname, lastname, secondname } = data;
            const isUserExists = yield prisma_1.default.user.findFirst({
                where: {
                    phone,
                },
            });
            if (isUserExists)
                throw api_error_1.default.badRequest(`Пользователь с таким телефоном уже существует`);
            const hashPassword = yield bcrypt_1.default.hash(password, 3);
            const user = yield prisma_1.default.user.create({
                data: {
                    firstname,
                    secondname,
                    lastname,
                    phone,
                    email,
                    password: hashPassword,
                    basket: { create: {} },
                },
            });
            const tokens = yield this.generateTokens({ id: user.id, type: user.type });
            const userDto = new user_dto_1.default(user);
            return Object.assign(Object.assign({}, userDto), tokens);
        });
    }
    static generateTokens(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = jsonwebtoken_1.default.sign({ payload }, process.env.JWT_ACCESS_SECRET, {
                expiresIn: '10s',
            });
            const refreshToken = jsonwebtoken_1.default.sign({ payload }, process.env.JWT_ACCESS_REFRESH, { expiresIn: '30d' });
            yield prisma_1.default.user.update({
                where: {
                    id: payload.id,
                },
                data: {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
            });
            return { accessToken, refreshToken };
        });
    }
    static refreshTokens(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!refreshToken)
                    throw api_error_1.default.unauthError();
                const userData = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_ACCESS_REFRESH);
                if (!userData)
                    throw api_error_1.default.unauthError();
                const refreshTokenFromDB = yield prisma_1.default.user.findUnique({
                    where: {
                        id: userData.payload.id,
                    },
                    select: {
                        refreshToken: true,
                    },
                });
                if (refreshToken !== refreshTokenFromDB.refreshToken)
                    throw api_error_1.default.unauthError();
                const newTokens = yield this.generateTokens(userData.payload);
                return newTokens;
            }
            catch (error) {
                throw api_error_1.default.unauthError();
            }
        });
    }
    static login(phone, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.user.findUnique({
                where: {
                    phone,
                },
            });
            if (!user)
                throw api_error_1.default.badRequest('Пользователь не найден');
            const isPasswordEquals = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordEquals) {
                throw api_error_1.default.badRequest('Пароль неверный');
            }
            const tokens = yield this.generateTokens({ id: user.id, type: user.type });
            const userDto = new user_dto_1.default(user);
            return Object.assign(Object.assign({}, userDto), tokens);
        });
    }
    static logout(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.default.user.update({
                where: {
                    id: userId,
                },
                data: {
                    accessToken: null,
                    refreshToken: null,
                },
            });
            return true;
        });
    }
    static editUser(userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, firstname, lastname, phone, secondname, oldPassword, password } = body;
            let newUser = { email, firstname, lastname, phone, secondname };
            if (oldPassword || password) {
                const passFromDb = yield prisma_1.default.user.findUnique({
                    where: {
                        id: userId,
                    },
                    select: {
                        password: true,
                    },
                });
                const isPassEquals = yield bcrypt_1.default.compare(oldPassword, passFromDb.password);
                if (!isPassEquals)
                    throw api_error_1.default.badRequest('Предыдущий пароль неверный');
                const newPassword = yield bcrypt_1.default.hash(password, 3);
                newUser.password = newPassword;
            }
            const user = yield prisma_1.default.user.update({
                where: {
                    id: userId,
                },
                data: newUser,
            });
            return user;
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map