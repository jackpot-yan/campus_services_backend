import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    idCard: number
    @Column()
    addTime: string
    @Column()
    partId: number
    @Column()
    content: string
}
