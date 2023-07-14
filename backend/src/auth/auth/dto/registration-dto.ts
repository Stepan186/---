import { IsEmailI18n, IsStringI18n } from '@1creator/backend';
import { IsOptional } from 'class-validator';

export class RegistrationDto {
    @IsOptional()
    @IsStringI18n()
    firstName?: string;

    @IsOptional()
    @IsStringI18n()
    lastName?: string;

    @IsStringI18n()
    @IsEmailI18n()
    email: string;

    @IsStringI18n()
    password: string;
}
