import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from './guard/skip.auth';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Public()
    @Post('login')
    login(@Body() dto: CreateUserDto) {
        return this.authService.loginUser(dto);
    }

    @Public()
    @Post('register')
    register(@Body() dto: CreateUserDto) {
    return this.authService.registerUser(dto);
    }
}
