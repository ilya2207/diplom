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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const api_error_1 = __importDefault(require("../../exceptions/api-error"));
const user_dto_1 = __importDefault(require("./user.dto"));
const user_service_1 = __importDefault(require("./user.service"));
const userSelectedFieldsFromPrisma = {
    firstname: true,
    secondname: true,
    lastname: true,
    phone: true,
    email: true,
    type: true,
    accessToken: true,
};
class UserController {
    static show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.auth.payload;
                const user = yield user_service_1.default.show(+id);
                return res.json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return next(api_error_1.default.badRequest('???????????? ?????? ??????????????????', errors.array()));
                }
                const userData = yield user_service_1.default.signup(req.body);
                res.cookie('refreshToken', userData.refreshToken, {
                    maxAge: 30 * 24 * 3600 * 1000,
                    httpOnly: true,
                });
                const { refreshToken } = userData, data = __rest(userData, ["refreshToken"]);
                res.json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { phone, password } = req.body;
                const userData = yield user_service_1.default.login(phone, password);
                res.cookie('refreshToken', userData.refreshToken, {
                    maxAge: 30 * 24 * 3600 * 1000,
                    httpOnly: true,
                });
                const { refreshToken } = userData, data = __rest(userData, ["refreshToken"]);
                return res.json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_service_1.default.logout(req.auth.payload.id);
                res.clearCookie('refreshToken');
                return res.status(200).json({ message: '??????????????' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const userData = yield user_service_1.default.refreshTokens(refreshToken);
                res.cookie('refreshToken', userData.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                return res.json({ accessToken: userData.accessToken });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const userData = yield user_service_1.default.editUser(req.auth.payload.id, body);
                const userDto = new user_dto_1.default(userData);
                return res.json(userDto);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map