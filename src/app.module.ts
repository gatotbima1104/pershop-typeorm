import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/guard/role.guard';
import { CaslModule } from './casl/casl.module';
import typeOrmConfig from './config/database/typeorm.config';


@Module({
  imports: [ProductModule, TypeOrmModule.forRoot(typeOrmConfig) ,UserModule, AuthModule, CaslModule],
  controllers: [],
  providers: [RolesGuard],
})
export class AppModule {}
