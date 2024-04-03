import {AppDataSource} from "../data-source"
import {NextFunction, Request, Response} from "express"
import {User} from "../entity/User"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async register(request: Request, response: Response, next: NextFunction) {
        const { userName, id, password, userType } = request.body
        const userHistory = await this.userRepository.find({ where: { idCard: id } })
        if (userHistory.length > 0) {
            return { 'code': 100, 'msg': '此学生证号已经注册!!!' }
        }
        const userInfo = Object.assign(new User(), {
            idCard: id,
            userType: userType,
            name: userName,
            password: password,
            history: '',
            phone: 0,
            sign: 0,
            address: '',
            part: '',
            finish: '',
        })
        await this.userRepository.save(userInfo)
        return { 'code': 0, 'msg': 'success' }
    }

    async createAdmin(request: Request, response: Response, next: NextFunction) {
        const adminInfo = await this.userRepository.findOne({ where: { userType: 1 } })
        if (adminInfo) {
            return {'code': 0, 'msg': 'success'}
        }
        const admin = Object.assign(new User(), {
            idCard: 0,
            userType: 1,
            name: 'admin',
            password: 'admin',
            history: '',
            phone: 0,
            sign: 0,
            address: '',
            part: '',
            finish: '',
        })
        await this.userRepository.save(admin)
        return { 'code': 0, 'msg': 'success' }
    }

    async login(request: Request, response: Response, next: NextFunction) {
        const { id, password, userType } = request.body
        if (userType === 1) {
            const userHistory = await this.userRepository.findOne({where: {userType: 1}})
            if (password === userHistory.password) {
                return {'code': 0, 'msg': 'success'}
            } else {
                return {'code': 100, 'msg': '密码错误'}
            }
        }
        const userHistory = await this.userRepository.findOne({ where: { idCard: id, userType } })
        if (userHistory === null) {
            return { 'code': 200, 'msg': '未查找到此学生证对应信息,请检查或联系管理员' }
        }
        if (userHistory.password == password) {
            return { 'code': 0, 'msg': 'success' }
        } else {
            return { 'code': 200, 'msg': '密码错误' }
        }
    }

    async addHistory(request: Request, response: Response, next: NextFunction) {
        const { id, comm } = request.body
        const user = await this.userRepository.findOne({
            where: { idCard: id }
        })
        const commList = comm.split(',')
        user.history = Array.from(new Set(commList)).join(',')
        return this.userRepository.save(user)
    }

    async getBaseInfo(request: Request, response: Response, next: NextFunction) {
        const idCard = parseInt(request.params.id)
        const user = await this.userRepository.findOne({
            where: { idCard }
        })
        return user
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
