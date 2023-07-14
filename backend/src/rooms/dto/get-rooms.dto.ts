import { IsDateStringI18n } from "@1creator/backend";

export class GetRoomsDto {
    @IsDateStringI18n()
    checkIn: Date;

    @IsDateStringI18n()
    checkOut: Date;
}