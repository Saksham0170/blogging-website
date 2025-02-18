"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const blog_1 = __importDefault(require("./routes/blog"));
const user_1 = __importDefault(require("./routes/user"));
const cors_1 = __importDefault(require("cors"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEyOWE0OWYxLTYyYTQtNDMxNC05OTE0LTQ4MjFiYTI5YTEyNiIsImlhdCI6MTczODY4MjQ1OX0.e2Gmub7vllWxgM-AnQ-DxJom61Ua0LulGn6rnMQQ7ew"}
app.use('/api/v1/user', user_1.default);
app.use('/api/v1/blog', blog_1.default);
// const blogRouter = express.Router();
// blogRouter.use(blogMiddleware);
// app.use('/api/v1/blog', blogRouter);
app.listen(3000);
