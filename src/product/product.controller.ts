import { Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { EditProductDto } from './dto/update-product.dto';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/roles.enum';
import { UUIDValidationPipe } from 'src/config/uuid.pipes';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }
  
  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id', UUIDValidationPipe) id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() dto: EditProductDto) {
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }


  @Get('category/tech')
  category(@Query('category') category: string){
    return this.productService.findByCategory(category)
  }

}
