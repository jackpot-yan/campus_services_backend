import {AppDataSource} from "../data-source";
import {NextFunction, Request, Response} from "express";
import {Part} from "../entity/part";

export class PartController {
    private partRepository = AppDataSource.getRepository(Part)

    async addNewPart(request: Request, response: Response, next: NextFunction) {
        const {name, introduce, local, commission, require, idCard} = request.body
        const partInfo = Object.assign(new Part(), {
            name: name,
            introduce: introduce,
            local: local,
            commission: commission,
            require: require,
            state: 0,
            idCard: idCard,
            recipient: 0
        })
        return await this.partRepository.save(partInfo)
    }

    async getAllPart(request: Request, response: Response, next: NextFunction) {
        const state = request.params.id
        if (state == 5) {
            return await this.partRepository.find()
        }
        return await this.partRepository.find({where: {state}})
    }

    async changePart(request: Request, response: Response, next: NextFunction) {
        const {id, state} = request.body
        const info = await this.partRepository.findOne({where: {id}})
        info.state = state
        return this.partRepository.save(info)
    }

    async getPartInfo(request: Request, repsonse: Response, next: NextFunction) {
        const idCard = request.params.id
        return await this.partRepository.find({where: {idCard}})
    }

    async accept(request: Request, response: Response, next: NextFunction) {
        const {id, idCard} = request.body
        const info = await this.partRepository.findOne({where: {id}})
        info.recipient = idCard
        return this.partRepository.save(info)
    }
    async getAcceptInfo(request: Request, response: Response, next: NextFunction) {
        const recipient = parseInt(request.params.idCard)
        return await this.partRepository.find({where: {recipient}})
    }

    async finishAccept(request: Request, response: Response, next: NextFunction) {

    }
}
