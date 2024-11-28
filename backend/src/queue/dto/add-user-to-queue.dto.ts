import {IsNumberI18n, IsStringI18n} from "@1creator/backend";

export class AddUserToQueueDTO {
    @IsNumberI18n()
    queueId: number;

    @IsStringI18n()
    userId: string;
}