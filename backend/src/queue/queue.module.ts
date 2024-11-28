import {Module} from "@nestjs/common";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {Queue} from "./entities/queue.entity";
import {QueueService} from "./queue.service";
import {QueueController} from "./queue.controller";

@Module({
    imports: [MikroOrmModule.forFeature([Queue])],
    exports: [QueueService],
    providers: [QueueService],
    controllers: [QueueController],
})

export class QueueModule {
}