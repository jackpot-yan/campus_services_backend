import {UserController} from "./controller/UserController"
import {AddressController} from "./controller/AddressController"
import {BuyInfoController} from "./controller/BuyController";
import {CommodController} from "./controller/CommodController";
import {PartController} from "./controller/PartController";
import {CollectController} from "./controller/CollectController";
import {CommentController} from "./controller/commentController";
import { ReportController } from "./controller/ReportController";

export const Routes = [{
    method: "post",
    route: "/login",
    controller: UserController,
    action: "login"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "getBaseInfo"
}, {
    method: "post",
    route: "/addHistory",
    controller: UserController,
    action: "addHistory"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: 'post',
    route: '/register',
    controller: UserController,
    action: 'register'
},
    {
        method: 'post',
        route: '/addNewAddress',
        controller: AddressController,
        action: 'addNewAddress'
    },
    {
        method: 'get',
        route: "/getAddress/:id",
        controller: AddressController,
        action: 'getAddress'
    },
    {
        method: 'post',
        route: '/addBuyHistory',
        controller: BuyInfoController,
        action: 'addBuyHistory'
    },
    {
        method: 'get',
        route: '/getBuyHistory/:id',
        controller: BuyInfoController,
        action: 'getBuyHistory'
    },
    {
        method: 'post',
        route: '/getImage',
        controller: CommodController,
        action: 'getImage'
    },
    {
        method: 'post',
        route: '/addCommod',
        controller: CommodController,
        action: 'addCommodInfo'
    },
    {
        method: 'get',
        route: '/createAdmin',
        controller: UserController,
        action: 'createAdmin'
    },
    {
        method: 'get',
        route: '/getSell/:id',
        controller: CommodController,
        action: 'getCommodInfo'
    },
    {
        method: 'get',
        route: '/getAllSell',
        controller: CommodController,
        action: 'getAllSell'
    },
    {
        method: 'post',
        route: '/changeSell',
        controller: CommodController,
        action: 'changeSellState'
    },
    {
        method: 'post',
        route: '/addPart',
        controller: PartController,
        action: 'addNewPart'
    },
    {
        method: 'get',
        route: '/getPart/:id',
        controller: PartController,
        action: 'getAllPart'
    },
    {
        method: 'post',
        route: '/changePart',
        controller: PartController,
        action: 'changePart'
    },
    {
        method: 'get',
        route: '/getPartInfo/:id',
        controller: PartController,
        action: 'getPartInfo'
    },
    {
        method: 'post',
        route: '/accept',
        controller: PartController,
        action: 'accept'
    },
    {
        method: 'get',
        route: '/getAcceptInfo/:idCard',
        controller: PartController,
        action: 'getAcceptInfo'
    },
    {
        method: 'post',
        route: '/writeBaseCommod',
        controller: CommodController,
        action: 'writeBaseCommod'
    },
    {
        method: 'post',
        route: '/getHistoryData',
        controller: CommodController,
        action: 'getHistoryData'
    },
    {
        method: 'get',
        route: '/getHomeData',
        controller: CommodController,
        action: 'getHomeData'
    },
    {
        method: 'post',
        route: '/modifyInfo',
        controller: UserController,
        action: 'modifyBaseInfo'
    },
    {
        method: 'post',
        route: '/addCollect',
        controller: CollectController,
        action: 'addCollect'
    },
    {
        method: 'get',
        route: '/getCollect/:idCard',
        controller: CollectController,
        action: 'getCollect'
    },
    {
        method: 'post',
        route: '/removeCollect',
        controller: CollectController,
        action: 'deleteCollect'
    },
    {
        method: 'post',
        route: '/addComment',
        controller: CommentController,
        action: 'addComment'
    },
    {
        method: 'get',
        route: '/getComment/:partId',
        controller: CommentController,
        action: 'getComment'
    },
    {
        method: 'get',
        route: '/deleteHistory/:id',
        controller: BuyInfoController,
        action: 'deleteBuyHistory'
    },
    {
        method: 'post',
        route: '/addReport',
        controller: ReportController,
        action: 'addReport'
    },
    {
        method: 'get',
        route: '/getReport',
        controller: ReportController,
        action: 'getReport'
    },
    {
        method: 'post',
        route: '/closeReport',
        controller: ReportController,
        action: 'closeReport'
    },
    {
        method: 'get',
        route: '/getUserReport/:idCard',
        controller: ReportController,
        action: 'getUserReport'
    }, 
    {
        method: 'get',
        route: '/getAddressEcharts',
        controller: AddressController,
        action: 'getAddresEcharts'
    },
    {
        method: 'get',
        route: '/getuserHistoryEcharts',
        controller: UserController,
        action: 'getHistoryEcharts'
    }
]
