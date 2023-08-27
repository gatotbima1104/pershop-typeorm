import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/auth/role/roles.enum";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt'

@Injectable() 
export class UserSeeder {
    constructor(@InjectRepository(User) private userRepo: Repository<User> ){}

    async seed() {
        await this.userRepo.delete({});
    
        const salt = await bcrypt.genSalt()
        const newUser = new User();
        newUser.name = 'Gatot'
        newUser.username = 'Super Gatot';
        newUser.password = 'super@admin.com';
        newUser.password = await bcrypt.hash(newUser.password, salt);
        newUser.role = Role.Admin;
    
        await this.userRepo.save(newUser)
      }
    
}
