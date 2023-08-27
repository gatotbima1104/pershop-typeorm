import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import { v4 as uuidv4 } from 'uuid';

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

    authorId: string;

    isPublished: boolean;
}