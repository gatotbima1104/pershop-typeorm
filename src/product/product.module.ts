import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { User } from 'src/user/entities/user.entity';
import { RolesGuard } from 'src/auth/guard/role.guard';

@Module({
  imports:[TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
],
})
export class ProductModule {}
