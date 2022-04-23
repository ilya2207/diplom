"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_1 = require("@prisma/client/runtime");
const api_error_1 = __importDefault(require("../exceptions/api-error"));
function errorMiddleware(err, _req, res, _next) {
    var _a;
    console.log(err.message);
    if (err instanceof api_error_1.default) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    if (err instanceof runtime_1.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            // @ts-ignore
            const field = (_a = err.meta) === null || _a === void 0 ? void 0 : _a.target;
            return res.status(400).json({ message: 'Такие данные уже существуют', field: field });
        }
    }
    return res.status(500).json({ message: 'Ошибка' });
}
exports.default = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map