import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity({ name: 'user'})
export class User{

    @PrimaryGeneratedColumn({ type: 'int'})
    id: number

    @Column({ unique: true })
    username: string

    @Column()
    password: string
}