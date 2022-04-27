"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewRouter = (0, express_1.Router)();
reviewRouter.get('/:detailId');
reviewRouter.post('/:detailId');
reviewRouter.put('/:reviewId');
reviewRouter.delete('/:reviewId');
exports.default = reviewRouter;
//# sourceMappingURL=review.js.map