import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/auth/role/roles.enum";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    // @IsString()
    // @IsNotEmpty()
    // role: string;
}
