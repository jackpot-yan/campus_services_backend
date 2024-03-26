import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Commod {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column()
    describe: string
    @Column()
    png: string
    @Column()
    price: string
    @Column()
    sales: string
    @Column()
    add_time: string
    @Column()
    comm: number
}
