import { IsNotEmpty, IsString } from "class-validator";

export class CreateTransaksiDto {
    @IsString()
    @IsNotEmpty()
    productId: string;


    @IsNotEmpty()
    jumlahBeli: number

}



