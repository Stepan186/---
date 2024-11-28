import {IsEnum} from "class-validator";
import {StatusEnum} from "../utils/enums/status.enum";

export class UpdateUserQueueDTO {
    @IsEnum(StatusEnum)
    status: StatusEnum;

}