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
const image_1 = __importDefault(require("./image"));
const router = (0, express_1.Router)();
router.use('/user', user_1.default);
router.use('/category', category_1.default);
router.use('/image', image_1.default);
router.use(unauth_middleware_1.default);
router.use(error_middleware_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map