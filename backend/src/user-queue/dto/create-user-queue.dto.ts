import {IsNumberI18n, IsStringI18n} from "@1creator/backend";

export class CreateUserQueueDto {

    @IsStringI18n()
    user: string;

    @IsNumberI18n()
    queue: number;
}