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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const prisma_1 = __importDefault(require("./prisma"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const compression_1 = __importDefault(require("compression"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(express_1.default.static(`${process.cwd()}/build`));
app.use('/images', express_1.default.static(`${process.cwd()}/images`));
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }));
app.use('/api', routes_1.default);
app.listen(5000, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Server has been stared at port : ${port}`);
    }
    catch (error) {
        prisma_1.default.$disconnect();
        console.log(error);
    }
}));
//# sourceMappingURL=app.js.map