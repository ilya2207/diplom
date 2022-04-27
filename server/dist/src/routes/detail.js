"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const detail_controller_1 = __importDefault(require("../handlers/detail/detail.controller"));
const detailRouter = (0, express_1.Router)();
detailRouter.get('/', detail_controller_1.default.show);
detailRouter.use((0, express_fileupload_1.default)());
detailRouter.post('/', detail_controller_1.default.add);
detailRouter.put('/:detailId', detail_controller_1.default.edit);
detailRouter.delete('/:detailId', detail_controller_1.default.delete);
exports.default = detailRouter;
//# sourceMappingURL=detail.js.map