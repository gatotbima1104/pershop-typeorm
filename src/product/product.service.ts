import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { EditProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productEntity: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    const product = this.productEntity.create({
      name: dto.name,
      price: dto.price,
    });

    return await this.productEntity.save(product);
  }

  async findAll() {
    const products = await this.productEntity.find();
    return products;
  }

  async findOne(id: number) {
    const getProductByID = await this.productEntity.findOne({
      where: {
        id,
      },
    });

    return getProductByID? getProductByID : new NotFoundException('product not found');
  }

  async update(id: number, dto: EditProductDto) {
    const productByID = await this.productEntity.findOne({ 
      where: {
          id,
      }
    })

    if(!productByID){
        throw new NotFoundException('product not found')
    }

    await this.productEntity.update({id}, {name: dto.name, price: dto.price})

    const updatedProduct = await this.productEntity.findOne({
        where: {
            id,
        }
    })

  return updatedProduct
  }

  async remove(id: number) {
    const product = await this.productEntity.delete({
      id,
    })

    if(!product){
        throw new NotFoundException('product not found')
    }
  }
}
