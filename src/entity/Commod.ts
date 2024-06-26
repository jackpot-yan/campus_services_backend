import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Commod {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column()
    page: string
    @Column()
    stock: number
    @Column()
    single: number
    @Column()
    idCard: number
    @Column()
    introduce: string
    @Column()
    state: number
    @Column()
    addTime: string
}
