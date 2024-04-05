import {AppDataSource} from "../data-source";
import {NextFunction, Request, Response} from "express";
import {Collect} from "../entity/collect"
import {Commod} from "../entity/Commod";

export class CollectController {
    private CollectRepository = AppDataSource.getRepository(Collect)
    private CommodRepository = AppDataSource.getRepository(Commod)

    async addCollect(request: Request, response: Response, next: NextFunction) {
        const {idCard, partId} = request.body
        const date = new Date()
        const month = date.getMonth() + 1
        const localTime = date.getFullYear() + '-' + month + '-' + date.getDate()
        const collect = Object.assign(new Collect(), {
            idCard: idCard,
            addTime: localTime,
            partId: partId,
            isDelete: 0
        })
        return await this.CollectRepository.save(collect)
    }

    async getCollect(request: Request, response: Response, next: NextFunction) {
        const idCard = parseInt(request.params.idCard)
        const info = await this.CollectRepository.find({where: {idCard}})
        const retData = []
        if (info.length == 0) {
            return {'code': 0, 'msg': '没有收藏'}
        } else {

            info.forEach((item, _) => {
                retData.push({id: item.partId})
            })
        }
        return await this.CommodRepository.find({where: retData})
    }

    async deleteCollect(request: Request, response: Response, next: NextFunction) {
        const {idCard, partid} = request.body
        const info = await this.CollectRepository.findOne({where: {idCard: idCard, partId: partid}})
        if (info != null) {
            return await this.CollectRepository.remove(info)
        }
    }
}
