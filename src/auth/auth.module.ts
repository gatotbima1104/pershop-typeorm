import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { jwtConstants } from './jwt.constant';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User]), JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '1h'}
  })],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
