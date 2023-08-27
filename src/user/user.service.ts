import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userEntity: Repository<User>,
  ) {}

  async findAll() {
    return await this.userEntity.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    try {
      const user = await this.userEntity.delete({
        id
      })
  
      if(!user){
        throw new HttpException({
          message: 'User not found'
        }, HttpStatus.NOT_FOUND)
      }
  
      return {
        message: 'User has been deleted'
      }
      
    } catch (error) {
      throw new HttpException({
        message: error.message,
      }, 
      HttpStatus.NOT_FOUND)
    }
  }
}
