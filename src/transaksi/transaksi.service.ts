import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { UpdateTransaksiDto } from './dto/update-transaksi.dto';
import { Transaksi } from './entities/transaksi.entity';
import { Product } from 'src/product/entities/product.entity';
import { Repository, DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TransaksiService {
  constructor(
    @InjectRepository(Transaksi) private transaksiEntity: Repository<Transaksi>, 
    @InjectRepository(Product) private productEntity: Repository<Product>,
    @InjectRepository(User) private userEntity: Repository<User>) {}


  async create(userId: string, dtoCreate: CreateTransaksiDto) {
    const {productId, jumlahBeli} = dtoCreate

    const user = await this.userEntity.findOne({
      where: {
        id: userId,
      }
    })

    const product = await this.productEntity.findOne({
      where: {
        id: productId,
      }
    })
    
    if(product.stock < jumlahBeli){
      throw new BadRequestException('Stock product tidak cukup')
    }

    console.log(product);
    console.log(user);
    console.log(jumlahBeli);

    const keranjang = this.transaksiEntity.create({
      user,
      product,
      jumlahBeli,
      createdAt: new Date(),
    } as DeepPartial <Transaksi>)


    product.stock -= jumlahBeli

  await this.transaksiEntity.save([keranjang])
  await this.productEntity.save(product);


  return {
    message: 'Product masuk keranjang',
    transactionId: keranjang.id
    // product: transactionWithProduct
  }
  }


  async findAll() {
    // const transactions = await this.transaksiEntity
    //   .createQueryBuilder('transaksi')
    //   .leftJoinAndSelect('transaksi.products', 'products')
    //   .getMany();

    // if (!transactions) {
    //   throw new NotFoundException('Transaksi tidak ditemukan');
    // }

    // return transactions

    const transactions = await this.transaksiEntity.find({
      relations: ['products', 'user'], // Include the 'products' relationship
    });
  
    if (!transactions) {
      throw new NotFoundException('Transaksi tidak ditemukan');
    }
  
    return transactions;
  }

  findOne(id: string) {
    const transactions = this.transaksiEntity.findOneBy({id})
    return transactions? transactions : new NotFoundException('Transaction not found')
  }

  update(id: number, updateTransaksiDto: UpdateTransaksiDto) {
    return `This action updates a #${id} transaksi`;
  }

  async remove(id: string) {
    const transaksi = await this.transaksiEntity.delete(id)

    if(!transaksi){
      throw new NotFoundException('Transaction not found')
    }

    return ({
      message: 'Transaksi deleted'
    })
  }
}

