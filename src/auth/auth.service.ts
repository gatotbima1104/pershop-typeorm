import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { Role } from './role/roles.enum';
import { JwtPayload } from './jwt/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userEntity: Repository<User>,
    private jwtService: JwtService,
    // private jwtPayload: JwtPayload,
  ) {}

  async registerUser(dto: CreateUserDto) {
    const duplicateUsername = await this.userEntity.findOne({
      where: {
        username: dto.username,
      },
    });

    if (duplicateUsername) {
      return {
        message: 'Username has been taken',
      };
    }
    const hashedPassword = await argon.hash(dto.password);

    const user = this.userEntity.create({
      username: dto.username,
      password: hashedPassword,
      // role: Role.Kasir
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
      // user,
      token_access
    }
    
  }

  async loginUser(dto: CreateUserDto) {
  
    const {id, username, role, password} =

     await this.userEntity.findOne({
      where: { username: dto.username}
     });

    if (!username) {
      throw new NotFoundException('Username is Incorrect');
    }

    const isMatch = await argon.verify(password, dto.password);

    if (isMatch) {
      // throw new NotFoundException('Password is Incorrect');

      const payload: JwtPayload = {
          id,
          role,
        };

        const user = await this.userEntity.findOne({
          where: {
            id
          }
        });

        return {
          access_token: this.jwtService.sign(payload),
          user: user,
        };


    }

    // const payload = {
    //   id: user.id,
    //   role: user.role,
    //   username: user.username
    // };

    // return {
    //   token: await this.jwtService.signAsync(payload),
    // };
  }
}
