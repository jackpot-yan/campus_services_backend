import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    idCard: number
    @Column()
    content: string
    @Column()
    commodId: number
    @Column()
    reply: string
}
