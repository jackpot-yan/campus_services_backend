import { UserController } from "./controller/UserController"
import { AddressController } from "./controller/AddressController"

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
}
]
