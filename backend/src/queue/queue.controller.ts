import {Body, Controller, Inject, Post} from "@nestjs/common";
import {getQueueDto} from "./dto/get-queue.dto";
import {createQueueDto} from "./dto/create-queue.dto";
import {QueueService} from "./queue.service";

@Controller("queue")
export class QueueController {
    constructor(
        @Inject("Queue") private readonly service: QueueService,
    ) {
    }

    @Post('store')
    async create(@Body() dto: createQueueDto) {
        return await this.service.create(dto);
    }

    @Post('getOne')
    public async getOne(@Body() dto: getQueueDto) {
        return this.service.getOne({id: dto.id});
    }
}