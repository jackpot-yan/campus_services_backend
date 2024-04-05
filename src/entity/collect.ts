import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Collect {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    idCard: number
    @Column()
    addTime: string
    @Column()
    partId: number
    @Column()
    isDelete: number
}
