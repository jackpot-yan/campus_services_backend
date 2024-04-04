import {AppDataSource} from "../data-source"
import {NextFunction, Request, Response} from 'express'
import {Commod} from "../entity/Commod"
const path = require('path')


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
        const month = date.getMonth() + 1
        const localTime = date.getFullYear() + '-' + month + '-' + date.getDate()
        const filePath = path.join(__dirname, '/image' + '/' + localTime + '/' + randomNumber + '.' + format)
        image.mv(filePath)
        return {'code': 0, 'msg': filePath}
    }

    async addCommodInfo(request: Request, response: Response, next: NextFunction) {
        const {title, page, stock, single, idCard, introduce} = request.body
        const date = new Date()
        const month = date.getMonth() + 1
        const localTime = date.getFullYear() + '-' + month + '-' + date.getDate()
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

    async writeBaseCommod(request: Request, response: Response, next: NextFunction) {
        const baseList = await this.commodRespository.find()
        if (baseList.length != 0) {
            return {'code': 0, 'msg': 'success'}
        }
        const {data} = request.body
        data.forEach((item, _) => {
            let baseInfo = Object.assign(new Commod(), {
                title: item.title,
                page: item.png,
                stock: 100,
                single: item.price,
                idCard: 0,
                introduce: item.describe,
                state:1,
                addTime: item.add_time
            })
            this.commodRespository.save(baseInfo)
        })
    }

    async getHistoryData(request: Request, response: Response, next: NextFunction) {
        const {historyList} = request.body
        const data = []
        const findCondition = []
        historyList.forEach((item, _) => {
            if (parseInt(item)) {
                findCondition.push({id: item})
                // let info = await this.commodRespository.findOne({where: {id: parseInt(item)}})
                // console.log(info)
                // data.push(info)
            }
        })
        const info = await this.commodRespository.find({where: findCondition})
        return {'code': 0, 'msg': info}
    }

    async getHomeData(request: Request, response: Response, next: NextFunction) {
        return await this.commodRespository.find({where: {state: 1}})
    }
}
