import { IsOptional, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsStringI18n } from "@1creator/backend";

export class CreateUserDto {
    @ApiProperty()
    @IsStringI18n()
    @MaxLength(100)
    email: string;

    @ApiProperty()
    @IsStringI18n()
    @MinLength(8)
    @MaxLength(100)
    password: string;

    @IsOptional()
    @IsStringI18n()
    firstName: string;

    @IsOptional()
    @IsStringI18n()
    lastName: string;
}
