import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Transaksi } from 'src/transaksi/entities/transaksi.entity';
import { Product } from 'src/product/entities/product.entity';
import { Profile } from './entities/user.profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Transaksi, Product, Profile])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
