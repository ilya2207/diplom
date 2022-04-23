"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = __importDefault(require("../exceptions/api-error"));
function unauthMiddleware(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        next(api_error_1.default.unauthError());
    }
    else {
        next(err);
    }
}
exports.default = unauthMiddleware;
//# sourceMappingURL=unauth.middleware.js.map