import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    idCard: number
    @Column()
    userType: number
    @Column()
    name: string
    @Column()
    password: string
    @Column()
    history: string
    @Column({type:'bigint'})
    phone: number
    @Column()
    sign: number
    @Column()
    part: string
    @Column()
    finish: string
}
