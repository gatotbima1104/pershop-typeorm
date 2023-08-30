import { IsInt, IsNotEmpty, IsNumber, IsString,  } from "class-validator";

export class CreateProductDto{

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    // @IsNumber()
    price: number;

    @IsNotEmpty()
    stock: number

    @IsNotEmpty()
    category: string
}