import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid';
import { Transaksi } from './../../transaksi/entities/transaksi.entity';
import { User } from 'src/user/entities/user.entity';

@Entity({ name: 'products'})
export class Product{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    name: string

    @Column({type: 'int'})
    price: number

    @Column({default: new Date()})
    createdAt: Date

    @Column({
        type: 'int'
    })
    stock: number

    @Column({nullable: true})
    category?: string

    @OneToMany(()=> Transaksi, (transaksi)=>transaksi.product)
    transaksis: Transaksi[]
    
}