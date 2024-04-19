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
        return await this.userRepository.findOne({
            where: {idCard}
        })
    }

    async modifyBaseInfo(request: Request, response: Response, next: NextFunction) {
        const {idCard, modify,modifyValue} = request.body
        const Card = parseInt(idCard)
        const baseInfo = await this.userRepository.findOne({where: {idCard: Card}})
        baseInfo[modify] = modifyValue
        await this.userRepository.save(baseInfo)
        return {'code': 0, 'msg': 'success'}
    }

    async getHistoryEcharts(request: Request, response: Response, next: NextFunction) {
        const info = await this.userRepository.find({where: {userType: 0}})
        const data = []
        const x = []
        const y = []
        info.forEach((item, _) => {
            const history = item.history.split(',')
            data.push(...history)
        })
        const count = await this.countElements(data)
        for (var key in count) {
            x.push(key)
            y.push(count[key])
        }
        return {'x': x, 'y': y}
    }

    async countElements(array) {
        const counts = {};
        array.forEach(element => {
          counts[element] = (counts[element] || 0) + 1;
        });
        return counts;
      }
}
