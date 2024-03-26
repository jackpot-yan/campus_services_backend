import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Address } from "../entity/address"

export class AddressController {
    private addressRepository = AppDataSource.getRepository(Address)

    async addNewAddress(request: Request, response: Response, next: NextFunction) {
        const { id, name, phone, city, street } = request.body
        try {
            const addressInfo = Object.assign(new Address(), {
                idCard: id,
                name: name,
                phone: phone,
                city: city,
                street: street
            })
            this.addressRepository.save(addressInfo)
            return { 'code': 0, 'msg': 'success' }
        } catch {
            return { 'code': 'cv-6', 'msg': '添加错误' }
        }
    }

    async getAddress(request: Request, response: Response, next: NextFunction) {
        const idCard = parseInt(request.params.id)
        const addressInfo = await this.addressRepository.find({ where: { idCard } })
        return addressInfo
    }
}