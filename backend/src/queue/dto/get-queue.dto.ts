import {IsNumberI18n} from "@1creator/backend";

export class getQueueDto {
    @IsNumberI18n()
    id: number;
}