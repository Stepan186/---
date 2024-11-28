import {Body, Controller, Inject, Post} from "@nestjs/common";
import {UserQueueService} from "./user-queue.service";
import {GetUserQueueDto} from "./dto/get-user-queue.dto";

@Controller("user-queue")
export class UserQueueController {
    constructor(
        @Inject() private readonly service: UserQueueService,
    ) {
    }

    @Post('getMany')
    getMany(@Body() dto: GetUserQueueDto) {
    }
}