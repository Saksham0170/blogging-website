import express from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { User, Post } from '@prisma/client';
import 'dotenv/config'
import { signupInput, signinInput } from 'medium-common-madebysaksham';


const userRouter = express.Router();

const prisma = new PrismaClient();

userRouter.post('/signup', async (req, res, next) => {

    try {
        const { name, email, password } = req.body;
        const body = req.body;
        const {success} = signupInput.safeParse(body);
        if(!success){
            res.status(411).json({"message": "Invalid inputs"});
            return;
        }
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        })
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user.id }, secret as string);
        res.json({ token });
    } catch (e) {
        res.status(500).json({ message: "Failed to sign up" });
    }
})

userRouter.post('/signin', async (req, res, next) => {
    const { email, password } = req.body;
    const body = req.body;
    const {success} = signinInput.safeParse(body);
    if(!success){
        res.status(411).json({"message": "Invalid inputs"});
        return;
    }
    const user = await prisma.user.findUnique({
        where: {
            email: email,
            password: password
        }
    })
    if (!user) {
        res.json({ "message": "user does not exist" });
        return;
    }

    const token = jwt.sign({ id: user?.id }, process.env.JWT_SECRET as string);
    if(!token){
        res.json({"message": "cannot signin"});
        return;
    }
    res.json({token});
})


export default userRouter;