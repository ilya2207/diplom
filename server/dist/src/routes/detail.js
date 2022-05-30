"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_jwt_1 = require("express-jwt");
const detail_controller_1 = __importDefault(require("../handlers/detail/detail.controller"));
const admin_middleware_1 = __importDefault(require("../middlewares/admin.middleware"));
const detailRouter = (0, express_1.Router)();
detailRouter.get('/', detail_controller_1.default.show);
detailRouter.get('/search', detail_controller_1.default.search);
detailRouter.get('/popular', detail_controller_1.default.getPopular);
detailRouter.get('/new', detail_controller_1.default.getNew);
detailRouter.use((0, express_jwt_1.expressjwt)({
    secret: process.env.JWT_ACCESS_SECRET,
    algorithms: ['HS256'],
}));
detailRouter.use((0, express_fileupload_1.default)());
detailRouter.use(admin_middleware_1.default);
// detailRouter.delete('/disconnect/:type/:typeId/:detailId')
detailRouter.post('/', detail_controller_1.default.add);
detailRouter.put('/:detailId', detail_controller_1.default.edit);
detailRouter.delete('/:detailId', detail_controller_1.default.delete);
detailRouter.get('/search/adminSearch', detail_controller_1.default.adminSearch);
exports.default = detailRouter;
//# sourceMappingURL=detail.js.map