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
const express_1 = require("express");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const imageRouter = (0, express_1.Router)();
imageRouter.use((0, express_fileupload_1.default)());
imageRouter.post('/upload', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.files.img);
            console.log(req.body);
            console.log(Date.now());
            // @ts-ignore
            yield req.files.img.mv(
            // @ts-ignore
            `${process.cwd()}/images/${Date.now() + req.files.img.name}`, function (err) {
                if (err) {
                    next(err);
                }
            });
        }
        catch (error) {
            next(error);
        }
    });
});
exports.default = imageRouter;
//# sourceMappingURL=image.js.map