import { IsNotEmpty } from "class-validator";

export class UserProfileDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;
}