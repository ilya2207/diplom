"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static unauthError() {
        return new ApiError(401, 'Пользователь не авторизован');
    }
    static badRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
    static forbiddenError() {
        return new ApiError(403, 'Ошибка доступа');
    }
}
exports.default = ApiError;
//# sourceMappingURL=api-error.js.map