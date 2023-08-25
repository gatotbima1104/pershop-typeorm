import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { EditProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productEntity: Repository<Product>
  ) {}

  async create(dto: CreateProductDto) {
    try {
      const duplicateProduct = await this.productEntity.findOne({
        where:{
          name: dto.name
        }
      })
  
      if(duplicateProduct){
        return {
          message: `Produk ${dto.name} has been taken`,
        };
      }
  
        const product = this.productEntity.create({
          name: dto.name,
          price: dto.price,
        });
  
        return await this.productEntity.save(product); 
      
    } catch (error) {
      console.log(error);
    }
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
    try {
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
  
    return {
      message: 'Product has been updated successfully',
      updatedProduct
    }
    } catch (error) {
      console.log(error)
    }
  }

  async remove(id: number) {
    const product = await this.productEntity.delete({
      id,
    })

    if(!product){
        throw new NotFoundException('product not found')
    }

    return {
      message: 'Product has been deleted'
    }
  }

}
