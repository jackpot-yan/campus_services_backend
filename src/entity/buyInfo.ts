import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class BuyInfo {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    time: string
    @Column()
    name: string
    @Column()
    idCard: number
    @Column()
    num: number
    @Column()
    total: string
}
