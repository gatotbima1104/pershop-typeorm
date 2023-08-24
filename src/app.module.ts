import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ProductModule, TypeOrmModule.forRoot({
    type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'admin123',
      database: 'pershop-typeorm-db',
      entities: [Product, User],
      synchronize: true,
  }), UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
