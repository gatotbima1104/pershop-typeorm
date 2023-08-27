import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt/jwt.interface';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from 'src/user/dto/login.user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userEntity: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(dto: CreateUserDto) {
    const duplicateUsername = await this.userEntity.findOne({
      where: {
        username: dto.username,
      },
    });

    if (duplicateUsername) {
      throw new HttpException({
        message: 'Username has been taken',
        statusCode: 403,
      }, HttpStatus.FORBIDDEN
      )
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(dto.password, salt)

    const user = this.userEntity.create({
      name: dto.name,
      username: dto.username,
      password: hashedPassword,
    });

    // add payload register jwt
    const payload: JwtPayload = {
      id: user.id,
      role: user.role
    }

    const token_access = this.jwtService.sign(payload)

    ///////////////

    await this.userEntity.save(user);

    return{
      message: 'you are registered',
      token_access
    }
    
  }

  async loginUser(dto: LoginUserDto) {
    const user = await this.userEntity.findOne({
      where: { username: dto.username}
     });

    if (!user) {
      throw new HttpException({
        message: 'your username is incorrect',
        statusCode: 404,
      }, HttpStatus.NOT_FOUND
      )
    }

    const isMatch = await this.validatePassword(dto.password, user.password)

    if(!isMatch) {
      throw new HttpException({
        message: 'your password is incorrect',
        statusCode: 404,
      }, HttpStatus.UNAUTHORIZED
      )
    }

    delete user.password

    const payload: JwtPayload = {
      id: user.id,
      role: user.role
    }

    return {
      token: this.jwtService.sign(payload),
      user,
    }


    // if (isMatch) {
    //   const payload: JwtPayload = {
    //       id,
    //       role,
    //     };

    //     const user = await this.userEntity.findOne({
    //       where: {
    //         id
    //       }
    //     });

    //     delete user.password

    //     return {
    //       access_token: this.jwtService.sign(payload),
    //       id: user.id,
    //       username: user.username,
    //     };
    // }
  }

  async validatePassword(password: string, hashed: string){
      return await bcrypt.compare(password, hashed)
  }
}
