import { IsBooleanI18n, IsDateStringI18n, IsNumberI18n } from "@1creator/backend";
import { IsBoolean } from "class-validator";

export class CreateBookingDto {
    @IsNumberI18n()
    room: number;

    @IsDateStringI18n()
    checkIn: Date;

    @IsDateStringI18n()
    checkOut: Date;

    @IsBooleanI18n()
    isVip = false;
}