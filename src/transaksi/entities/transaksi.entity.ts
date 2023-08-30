import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "transaksi"})
export class Transaksi {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    createdAt: Date;

    @Column()
    jumlahBeli: number;

    @ManyToOne(() => Product, (product)=>product.transaksis)
    product: Product;

    @ManyToOne(() => User, (user)=>user.transaksis)
    user: User;
}


