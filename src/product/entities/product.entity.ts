import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity({ name: 'products'})
export class Product{

    @PrimaryGeneratedColumn({ type: 'int'})
    id: number

    @Column({ unique: true })
    name: string

    @Column()
    price: number

    @Column({default: new Date()})
    createdAt: Date
}