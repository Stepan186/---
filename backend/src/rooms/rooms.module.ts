import { MikroOrmModule } from "@mikro-orm/nestjs";
import { RoomsService } from "./rooms.service";
import { RoomsController } from "./rooms.controller";
import { Room } from "./entities/room.entity";
import { Module } from "@nestjs/common";

@Module({
    imports: [MikroOrmModule.forFeature([Room])],
    exports: [RoomsService],
    controllers: [RoomsController],
    providers: [RoomsService],
})

export class RoomsModule {
}