import {AppDataSource} from "../data-source"
import {NextFunction, Request, Response} from "express"
import {BuyInfo} from "../entity/buyInfo";

export class BuyInfoController {
    private buyRepository = AppDataSource.getRepository(BuyInfo)

    async addBuyHistory(request: Request, response: Response, next: NextFunction) {
        const {name, idCard, num, total} = request.body
        const date = new Date()
        const localTime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
        const info = Object.assign(new BuyInfo(),{
            time: localTime,
            name: name,
            idCard: idCard,
            num: num,
            total: total
        })
        await this.buyRepository.save(info)
        return {'code': 0, 'msg': 'success'}
    }

    async getBuyHistory(request: Request, response: Response, next: NextFunction) {
        const idCard = parseInt(request.params.id)
        return await this.buyRepository.find({where: {idCard}})
    }
}
