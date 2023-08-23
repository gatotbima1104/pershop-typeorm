import { IsInt, IsNotEmpty, IsString,  } from "class-validator";

export class CreateProductDto{

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsInt()
    price: number;
}