import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Commod } from "./entity/Commod"
import { Address } from './entity/address'

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root123",
    database: "campus",
    synchronize: true,
    logging: false,
    entities: [User, Commod, Address],
    migrations: [],
    subscribers: [],
})
