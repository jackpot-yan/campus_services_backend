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
    @Column()
    phone: number
    @Column()
    sign: number
}
