import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon from 'argon2'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userEntity: Repository<User>,
  ) {}

  // async registerUser(dto: CreateUserDto) {
  //   const duplicateUsername = await this.userEntity.findOne({
  //     where:{
  //         username:dto.username,
  //     }
  //   })

  //   if(duplicateUsername){
  //       throw new Error('Username Has Been Taken')
  //   }

  //   const hashedPassword = await argon.hash(dto.password)

  //   const user = this.userEntity.create({
  //       username: dto.username,
  //       password: hashedPassword,
  //   })

  // return await this.userEntity.save(user)
  // }


  // async loginUser(dto: CreateUserDto){
  //   const user = await this.userEntity.findOne({ 
  //     where: { 
  //       username: dto.username
  //     }
  //   })

  //   if(!user){
  //     throw new NotFoundException('Username is Incorrect')
  //   }

  //   const isMatch = await argon.verify(user.password, dto.password)

  //   if(!isMatch){
  //     throw new NotFoundException('Password is Incorrect')
  //   }

  //   const payload = {
  //     sub: user.id,
  //     username: user.username
  //   } 
  // }

  findAll() {
    return this.userEntity.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
