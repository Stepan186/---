import {Module} from "@nestjs/common";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {UserQueueService} from "./user-queue.service";
import {UserQueue} from "./entities/user-queue.entity";
import {UserQueueController} from "./user-queue.controller";

@Module({
    imports: [MikroOrmModule.forFeature([UserQueue])],
    exports: [UserQueueService],
    providers: [UserQueueService],
    controllers: [UserQueueController],
})

export class UserQueueModule {
}