import express from "express";
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { json } from "body-parser";
import { object } from "zod";

const prisma = new PrismaClient();
const blogRouter = express.Router();

const blogMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    const jwtToken: string | undefined = req.headers.authorization;
    
    if (!jwtToken || !jwtToken.startsWith("Bearer ")) {
      res.status(401).json({ message: "Invalid or missing token" });
      return; 
    }
    
    const token: string = jwtToken.split(' ')[1];  
    
    try {

      const payload = jwt.verify(token, process.env.JWT_SECRET as string);
      
      if (!payload) {
        res.status(401).json({ error: "JWT not verified" }); 
        return; 
      }
      (req as any).user = payload;
      next(); 
    } catch (error) {
      res.status(403).json({ error: "Token verification failed" }); 
      return; 
    }
  };
  
  blogRouter.use(blogMiddleware);

blogRouter.post('/', async(req, res , next)=>{
    try{
        const authorId = (req as any).user.id;
        const {title, content} = req.body;
        const userPost = await prisma.post.create({
            data:{
                title: title,
                content: content,
                authorId: authorId,
                publishedDate: new Date()
            }
        })
        res.json({
            id: userPost.id
        })
    }catch(e){
        res.json({"message": "could not post the blog"})
    }
})

blogRouter.put('/', async(req, res, next)=>{
    try{
        const authorId = (req as any).user.id;
        const {id, title, content} = req.body;
        const userPost = await prisma.post.update({
            where:{
                id: id
            },
            data:{
                title: title,
                content: content
            }
        })
        res.json({"message":"post updated"});
    }catch(e){
        res.json({"message": "unable to update post"});
    }
})

blogRouter.get('/bulk', async(req, res, next)=>{
    try{
        const blog = await prisma.post.findMany({
            select:{
                content: true,
                title: true,
                id: true,
                author: {
                    select:{
                        name: true
                    }
                },
                publishedDate: true
            }
        })
        res.json({blog});
    }catch(e){
        res.json({"message": "Failed to get blogs"})
    }
})  


blogRouter.get('/:id', async(req, res, next)=>{
    try{
        const id = req.params.id;
        const blog = await prisma.post.findUnique({
            where: {
                id
            },
            select:{
                content: true,
                title: true,
                id: true,
                author: {
                    select:{
                        name: true
                    }
                },
                publishedDate: true
            }
        })
        res.json({blog});
    }catch(e){
        res.json({"message": "Failed to get post"});
    }
})


export default blogRouter;