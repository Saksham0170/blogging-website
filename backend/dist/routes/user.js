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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
require("dotenv/config");
const medium_common_madebysaksham_1 = require("medium-common-madebysaksham");
const userRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
userRouter.post('/signup', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const body = req.body;
        const { success } = medium_common_madebysaksham_1.signupInput.safeParse(body);
        if (!success) {
            res.status(411).json({ "message": "Invalid inputs" });
            return;
        }
        const user = yield prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        });
        const secret = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign({ id: user.id }, secret);
        res.json({ token });
    }
    catch (e) {
        res.status(500).json({ message: "Failed to sign up" });
    }
}));
userRouter.post('/signin', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const body = req.body;
    const { success } = medium_common_madebysaksham_1.signinInput.safeParse(body);
    if (!success) {
        res.status(411).json({ "message": "Invalid inputs" });
        return;
    }
    const user = yield prisma.user.findUnique({
        where: {
            email: email,
            password: password
        }
    });
    if (!user) {
        res.json({ "message": "user does not exist" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user.id }, process.env.JWT_SECRET);
    if (!token) {
        res.json({ "message": "cannot signin" });
        return;
    }
    res.json({ token });
}));
exports.default = userRouter;
