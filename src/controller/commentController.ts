import {AppDataSource} from "../data-source";
import {NextFunction, Request, Response} from "express";
import {Comment} from "../entity/comment";

export class CommentController {
    private CommentRepository = AppDataSource.getRepository(Comment)

    async addComment(request: Request, response: Response, next: NextFunction) {
        const {idCard, content, partId} = request.body
        const date = new Date()
        const month = date.getMonth() + 1
        const localTime = date.getFullYear() + '-' + month + '-' + date.getDate()
        const comment = Object.assign(new Comment(), {
            idCard: idCard,
            addTime: localTime,
            partId: partId,
            content: content
        })
        return this.CommentRepository.save(comment)
    }
    async getComment(request: Request, response: Response, next: NextFunction) {
        const partId = parseInt(request.params.partId)
        return await this.CommentRepository.find({where: {partId}})
    }
}
