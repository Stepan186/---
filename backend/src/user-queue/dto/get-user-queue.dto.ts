import {IsNumberI18n} from "@1creator/backend";

export class GetUserQueueDto {
    @IsNumberI18n()
    queueId: number;
}