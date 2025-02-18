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
const prisma = new client_1.PrismaClient();
const blogRouter = express_1.default.Router();
const blogMiddleware = (req, res, next) => {
    const jwtToken = req.headers.authorization;
    if (!jwtToken || !jwtToken.startsWith("Bearer ")) {
        res.status(401).json({ message: "Invalid or missing token" });
        return;
    }
    const token = jwtToken.split(' ')[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!payload) {
            res.status(401).json({ error: "JWT not verified" });
            return;
        }
        req.user = payload;
        next();
    }
    catch (error) {
        res.status(403).json({ error: "Token verification failed" });
        return;
    }
};
blogRouter.use(blogMiddleware);
blogRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorId = req.user.id;
        const { title, content } = req.body;
        const userPost = yield prisma.post.create({
            data: {
                title: title,
                content: content,
                authorId: authorId,
                publishedDate: new Date()
            }
        });
        res.json({
            id: userPost.id
        });
    }
    catch (e) {
        res.json({ "message": "could not post the blog" });
    }
}));
blogRouter.put('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorId = req.user.id;
        const { id, title, content } = req.body;
        const userPost = yield prisma.post.update({
            where: {
                id: id
            },
            data: {
                title: title,
                content: content
            }
        });
        res.json({ "message": "post updated" });
    }
    catch (e) {
        res.json({ "message": "unable to update post" });
    }
}));
blogRouter.get('/bulk', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                },
                publishedDate: true
            }
        });
        res.json({ blog });
    }
    catch (e) {
        res.json({ "message": "Failed to get blogs" });
    }
}));
blogRouter.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const blog = yield prisma.post.findUnique({
            where: {
                id
            },
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                },
                publishedDate: true
            }
        });
        res.json({ blog });
    }
    catch (e) {
        res.json({ "message": "Failed to get post" });
    }
}));
exports.default = blogRouter;
