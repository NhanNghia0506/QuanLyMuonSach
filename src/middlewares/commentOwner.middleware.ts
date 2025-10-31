import { NextFunction, Request, Response } from "express"
import { CommentRepository } from "../modules/comment/repositories"

const isCommentOwner = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        if(!req.params.id)
            return res.status(400).json({ message: "Bạn chưa truyền tham số"});
        
        const comment = await new CommentRepository().getCommentById(req.params.id);
        if(!comment) {
            return res.status(404).json({ message: "Bình luận này không tồn tại" })
        }

        if(!req.user || comment.author.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "Bạn không có quyền chỉnh sửa bình luận này" })
        }
        next()
    } catch (error: any) {
         res.status(500).json({ message: error.message })
    }
}

export default isCommentOwner;