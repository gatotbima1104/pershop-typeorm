import { Role } from 'src/auth/role/roles.enum';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'user'})
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column({ type: 'enum', enum: Role, default: Role.Kasir })
    role: Role;

    isAdmin: boolean
}