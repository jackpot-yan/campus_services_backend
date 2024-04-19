import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from 'express'
import { Report } from "../entity/report"

export class ReportController {
    private reportRespository = AppDataSource.getRepository(Report)

    async addReport(request: Request, response: Response, next: NextFunction) {
        const { idCard, content, commodId } = request.body
        console.log(idCard, content, commodId)
        const info = Object.assign(new Report(), {
            idCard: parseInt(idCard),
            content: content,
            commodId: commodId,
            reply: ''
        })
        return await this.reportRespository.save(info)
    }

    async getReport(request: Request, response: Response, next: NextFunction) {
        return await this.reportRespository.find()
    }

    async closeReport(request: Request, response: Response, next: NextFunction) {
        const {reply, id} = request.body
        const info = await this.reportRespository.findOne({where: {id}})
        info.reply = reply
        return this.reportRespository.save(info)
    }

    async getUserReport(request: Request, response: Response, next: NextFunction) {
        const idCard = parseInt(request.params.idCard)
        const info = await this.reportRespository.find({where: {idCard}})
        return info
    }
}
