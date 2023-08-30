import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'user_profile'})
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
}