import { PrismaClient } from '@prisma/client';
import express from 'express';
import jwt from 'jsonwebtoken';
import { User, Post } from '@prisma/client';
import 'dotenv/config'
import blogRouter from './routes/blog';
import userRouter from './routes/user';
import cors from 'cors';


const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());
//{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEyOWE0OWYxLTYyYTQtNDMxNC05OTE0LTQ4MjFiYTI5YTEyNiIsImlhdCI6MTczODY4MjQ1OX0.e2Gmub7vllWxgM-AnQ-DxJom61Ua0LulGn6rnMQQ7ew"}

app.use('/api/v1/user', userRouter);
app.use('/api/v1/blog', blogRouter);





// const blogRouter = express.Router();
// blogRouter.use(blogMiddleware);
// app.use('/api/v1/blog', blogRouter);



app.listen(3000);

