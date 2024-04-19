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
            await this.addressRepository.save(addressInfo)
            return { 'code': 0, 'msg': 'success' }
        } catch {
            return { 'code': 'cv-6', 'msg': '添加错误' }
        }
    }

    async getAddress(request: Request, response: Response, next: NextFunction) {
        const idCard = parseInt(request.params.id)
        return await this.addressRepository.find({ where: { idCard } })
    }

    async getAddresEcharts(request: Request, response: Response, next: NextFunction) {
        const address = await this.addressRepository.find()
        const data = []
        const temps: string[] = []
        address.forEach((item, _) => {
            const userAddress = item.city
            const province = userAddress.split('/')[0]
            if (data.length == 0) {
                data.push({ value: 1, name: province })
                temps.push(province)
            } else {
                if (temps.indexOf(province) != -1) {
                    data.forEach((item, index) => {
                        if (item['name'] == province) {
                            item['value'] = item['value'] + 1
                        }
                    })
                } else {
                    data.push({ value: 1, name: province })
                    temps.push(province)
                }
            }
        })
        return data
    }
}
