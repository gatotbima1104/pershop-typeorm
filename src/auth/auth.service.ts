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
      return {
        message: 'Username has been taken',
      };
    }
    const hashedPassword = await argon.hash(dto.password);

    const user = this.userEntity.create({
      username: dto.username,
      password: hashedPassword,
      role: Role.Kasir
    });
    return  await this.userEntity.save(user);
  }

  async loginUser(dto: CreateUserDto) {
    const user = await this.userEntity.findOne({
      where: {
        username: dto.username,
      },
    });

    if (!user) {
      throw new NotFoundException('Username is Incorrect');
    }

    const isMatch = await argon.verify(user.password, dto.password);

    if (!isMatch) {
      throw new NotFoundException('Password is Incorrect');
    }

    const payload = {
      sub: user.id,
      // username: user.username,
      role: user.role
    };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
