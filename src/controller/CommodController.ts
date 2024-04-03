import {AppDataSource} from "../data-source"
import {NextFunction, Request, Response} from 'express'
import {Commod} from "../entity/Commod"


export class CommodController {
    private commodRespository = AppDataSource.getRepository(Commod)

    async getCommodInfo(request: Request, response: Response, next: NextFunction) {
        const idCard = parseInt(request.params.id)
        return await this.commodRespository.find({where: {idCard}})
    }

    async getImage(request: Request, response: Response, next: NextFunction) {
        var randomNumber = Math.floor(Math.random() * 100) + 1;
        let image = request.files.file
        const format = image.name.split('.')[image.name.split('.').length - 1]
        const date = new Date()
        const localTime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
        const filePath = './image' + '/' + localTime + '/' + randomNumber + '.' + format
        image.mv(filePath)
        return {'code': 0, 'msg': filePath}
    }

    async addCommodInfo(request: Request, response: Response, next: NextFunction) {
        const {title, page, stock, single, idCard, introduce} = request.body
        const date = new Date()
        const localTime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
        const commodInfo = Object.assign(new Commod(), {
            title: title,
            page: page,
            stock: stock,
            single: single,
            idCard: idCard,
            introduce: introduce,
            state: 0,
            addTime: localTime
        })
        await this.commodRespository.save(commodInfo)
        return {'code': 0, 'msg': 'success'}
    }

    async getAllSell(request: Request, response:Response, next:NextFunction) {
        return await this.commodRespository.find()
    }

    async changeSellState(request: Request, response:Response, next:NextFunction) {
        const {id, state} = request.body
        const info = await this.commodRespository.findOne({where: {id}})
        info.state = state
        return this.commodRespository.save(info)
    }
}
