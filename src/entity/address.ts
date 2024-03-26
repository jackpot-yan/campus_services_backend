import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    idCard: number
    @Column()
    name: string
    @Column()
    phone: number
    @Column()
    city: string
    @Column()
    street: string
}
