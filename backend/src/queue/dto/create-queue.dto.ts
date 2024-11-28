import {IsStringI18n} from "@1creator/backend";

export class createQueueDto {
    @IsStringI18n()
    cabinet: string;
}