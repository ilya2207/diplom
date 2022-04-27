"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const unauth_middleware_1 = __importDefault(require("../middlewares/unauth.middleware"));
const user_1 = __importDefault(require("./user"));
const category_1 = __importDefault(require("./category"));
const model_1 = __importDefault(require("./model"));
const detail_1 = __importDefault(require("./detail"));
const review_1 = __importDefault(require("./review"));
const order_1 = __importDefault(require("./order"));
const router = (0, express_1.Router)();
router.use('/detail', detail_1.default);
router.use('/category', category_1.default);
router.use('/model', model_1.default);
router.use('/user', user_1.default);
router.use('/review', review_1.default);
router.use('/order', order_1.default);
router.use(unauth_middleware_1.default);
router.use(error_middleware_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map