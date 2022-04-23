"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_service_1 = __importDefault(require("./model.service"));
class ModelController {
    static show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const models = yield model_service_1.default.show();
                return res.json(models);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
            }
            catch (error) {
                next(error);
            }
        });
    }
    static edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                next(error);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = ModelController;
//# sourceMappingURL=model.controller.js.map