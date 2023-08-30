import { IsInt, IsNotEmpty, IsString,  } from "class-validator";

export class EditProductDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    // @IsInt()
    price: number;

    @IsNotEmpty()
    stock: number;

    @IsNotEmpty()
    category: string
}