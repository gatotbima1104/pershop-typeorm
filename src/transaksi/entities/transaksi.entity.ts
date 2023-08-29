import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Transaksi {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
