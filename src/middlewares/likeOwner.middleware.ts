import { NextFunction, Request, Response } from "express";
import PostRepository from "../modules/post/repositories";

const isLikeOwner = async (req: Request<{ postId: string }, {}, {}>, res: Response, next: NextFunction) => {
    try {
        const post = await new PostRepository().getPostById(req.params.postId);
        if(!post) {
            return res.status(404).json({ message: "Bài viết này không tồn tại" })
        }

         
    } catch (error) {
        
    }
}