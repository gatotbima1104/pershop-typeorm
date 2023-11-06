import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/auth/role/roles.enum";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(Role)
    role: Role
}
