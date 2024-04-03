import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Part {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    introduce: string
    @Column()
    local: string
    @Column()
    commission: string
    @Column()
    require: string
    @Column()
    state: number
    @Column()
    idCard: number
    @Column()
    recipient: number
}

