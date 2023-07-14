import { Module } from "@nestjs/common";
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Booking } from "./entities/booking.entity";
import { BookingService } from "./booking.service";
import { BookingController } from "./booking.controller";
import { BookingCronService } from "./booking-cron.service";
import { ScheduleModule } from "@nestjs/schedule";
import { RoomsModule } from "../rooms/rooms.module";

@Module({
    imports: [MikroOrmModule.forFeature([Booking]), ScheduleModule.forRoot(), RoomsModule],
    exports: [BookingService],
    controllers: [BookingController],
    providers: [BookingCronService, BookingService],
})

export class BookingModule {
}