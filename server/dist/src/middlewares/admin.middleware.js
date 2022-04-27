"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = __importDefault(require("../exceptions/api-error"));
function adminMiddleware(req, _res, next) {
    try {
        const { type } = req.auth.payload;
        if (type === 'user')
            return next(api_error_1.default.forbiddenError());
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.default = adminMiddleware;
//# sourceMappingURL=admin.middleware.js.map