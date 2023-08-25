import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/auth/role/roles.enum";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import * as argon from 'argon2'

@Injectable() 
export class UserSeeder {
    constructor(@InjectRepository(User) private userRepo: Repository<User> ){}

    async seed() {
        await this.userRepo.delete({});
    
        const newUser = new User();
        newUser.username = 'Super Gatot';
        newUser.password = 'super@admin.com';
        newUser.password = await argon.hash(newUser.password);
        newUser.role = Role.Admin;
    
        await this.userRepo.save(newUser)
      }
    
}
