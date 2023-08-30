import { Role } from 'src/auth/role/roles.enum';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import { v4 as uuidv4 } from 'uuid';
import { Transaksi } from 'src/transaksi/entities/transaksi.entity';
import { Profile } from './user.profile.entity';

@Entity({ name: 'users'})
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

    @OneToOne(()=> Profile)
    @JoinColumn()
    profile: Profile;

    @OneToMany(()=> Transaksi, (transaksi)=>transaksi.user)
    transaksis: Transaksi[];
}