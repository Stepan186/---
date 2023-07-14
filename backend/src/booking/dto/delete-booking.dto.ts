import { IsStringI18n } from "@1creator/backend";

export class DeleteBookingDto {
    @IsStringI18n()
    uuid: string;
}