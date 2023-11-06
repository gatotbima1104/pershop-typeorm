import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/roles.enum';
import { UserProfileDto } from './dto/user.profile.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  // findAll(): Promise<User[]> {
  @Get()
  @Roles(Role.Admin)
  findAll(){
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() dto: CreateUserDto) {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post(':id/profile')
  createUserProfile(@Param('id') id: string, @Body() dto: UserProfileDto) {
    return this.userService.userProfile(id, dto)
  }

  @Post()
  createUser(@Body() dto: CreateUserDto){
    return this.userService.createUser(dto)
  }
}
