import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { getRepository } from "typeorm"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async register(request: Request, response: Response, next: NextFunction) {
        const {userName, id, password, userType} = request.body
        const userHistory = await this.userRepository.find({where: {idCard: id}})
        if (userHistory.length > 0) {
            return {'code': 100, 'msg': '此学生证号已经注册!!!'}
        }
        const userInfo = Object.assign(new User(), {
            idCard: id,
            userType: userType,
            name: userName,
            password: password,
            history: '',
            phone: 0,
            sign: 0
        })
        this.userRepository.save(userInfo)
        return {'code': 0, 'msg': 'success'}
    }

    async login(request: Request, response: Response, next: NextFunction) {
        const {id,password} = request.body
        const userHistory = await this.userRepository.findOne({where: {idCard: id}})
        if (userHistory === null) {
            return {'code': 200, 'msg': '未查找到此学生证对应信息,请检查或联系管理员'}
        }
        console.log(userHistory.password, password)
        if (userHistory.password == password) {
            return {'code': 0, 'msg': 'success'}
        } else {
            return {'code': 200, 'msg': '密码错误'}
        }
    }

    async addHistory(request: Request, response: Response, next: NextFunction) {
        const {id, comm} = request.body
        const user = await this.userRepository.findOne({
            where: {idCard: id}
        })
        const commList = comm.split(',')
        const commHistory = Array.from(new Set(commList)).join(',')
        user.history = commHistory
        return this.userRepository.save(user)
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;
        const user = Object.assign(new User(), {
            firstName,
            lastName,
            age
        })

        return this.userRepository.save(user)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }
}
