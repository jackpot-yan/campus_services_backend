import { UserController } from "./controller/UserController"

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
}]
