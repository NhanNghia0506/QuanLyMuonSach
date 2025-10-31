import { NextFunction, Request, Response } from "express";
import PostRepository from "../modules/post/repositories";
// Midleware dùng để kiểm tra client có phải chủ sở hữu của bình luận có id này không
const isPostOwner = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const post = await new PostRepository().getPostById(req.params.id);
        if(!post) {
            return res.status(404).json({ message: "Bài viết này không tồn tại" })
        }

        if(!req.user || post.author.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "Bạn không có quyền chỉnh sửa bài viết này" })
        }

        next()
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export default isPostOwner;