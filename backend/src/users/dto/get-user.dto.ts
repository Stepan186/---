import { IsStringI18n, MaxLengthI18n } from "@1creator/backend";
import { IsOptional } from "class-validator";

export class GetUserDto {
    @IsOptional()
    @IsStringI18n()
    @MaxLengthI18n(100)
    uuid?: string;

    @IsOptional()
    @IsStringI18n()
    @MaxLengthI18n(100)
    email?: string;
}