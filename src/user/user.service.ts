import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfileDto } from './dto/user.profile.dto';
import { Profile } from './entities/user.profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userEntity: Repository<User>,
    @InjectRepository(Profile) private profileEntity: Repository<Profile>,
  ) {}

  async findAll() {
    return await this.userEntity.find({relations: ['profile', 'transaksis']})
  }

  async findOne(id: string) {
    const user = await this.userEntity.findOneBy({id})

    if(!user){
      throw new NotFoundException('user not found')
    }

    return user
  }

  async update(id: string, dto: CreateUserDto) {
    const user = await this.userEntity.findOneBy({id})

    if(!user){
      new NotFoundException('user not found')
    }

    await this.userEntity.update(id, {
      ...user,
      ...dto
    })

    const updatedUser = await this.userEntity.findOneBy({id})

    return({
      message: 'user updated',
      updatedUser
    })

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

  async userProfile(id: string, dto: UserProfileDto){
    const user = await this.userEntity.findOneBy({id})

    if(!user){
      throw new NotFoundException('user not found')
    }

    const newProfile = this.profileEntity.create(dto)
    const savedProfile = await this.profileEntity.save(newProfile)

    console.log(savedProfile);

    user.profile = savedProfile

    return await this.userEntity.save(user)
  }
}
