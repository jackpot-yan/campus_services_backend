import { AppDataSource } from "../data-source"
import {NextFunction, Request, Response } from 'express'
import { Commod } from "../entity/Commod"

export class CommodController {
    private commodRespository = AppDataSource.getRepository(Commod)

    async getCommodInfo(request: Request, response: Response, next: NextFunction) {
        console.log('yes')
    }
}
