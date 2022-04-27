"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_jwt_1 = require("express-jwt");
const express_validator_1 = require("express-validator");
const user_controller_1 = __importDefault(require("../handlers/user/user.controller"));
const userRouter = (0, express_1.Router)();
userRouter.post('/signup', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 3, max: 32 }), user_controller_1.default.registration);
userRouter.post('/login', user_controller_1.default.login);
userRouter.post('/refresh', user_controller_1.default.refresh);
userRouter.use((0, express_jwt_1.expressjwt)({
    secret: process.env.JWT_ACCESS_SECRET,
    algorithms: ['HS256'],
}));
userRouter.get('/', user_controller_1.default.show);
userRouter.post('/logout', user_controller_1.default.logout);
userRouter.post('/edit', user_controller_1.default.edit);
exports.default = userRouter;
//# sourceMappingURL=user.js.map