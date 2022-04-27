"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const model_controller_1 = __importDefault(require("../handlers/model/model.controller"));
const modelRouter = (0, express_1.Router)();
modelRouter.get('/', model_controller_1.default.show);
modelRouter.get('/:modelId', model_controller_1.default.show);
modelRouter.get('/search');
// modelRouter.use(
//   expressjwt({
//     secret: process.env.JWT_ACCESS_SECRET,
//     algorithms: ['HS256'],
//   })
// )
// modelRouter.use(adminMiddleware)
modelRouter.delete('/:modelId', model_controller_1.default.delete);
modelRouter.use((0, express_fileupload_1.default)());
modelRouter.post('/', model_controller_1.default.add);
modelRouter.put('/:modelId', model_controller_1.default.edit);
exports.default = modelRouter;
//# sourceMappingURL=model.js.map