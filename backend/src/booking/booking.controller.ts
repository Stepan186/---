import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { TakeUser } from "@1creator/backend";
import { DeleteBookingDto } from "./dto/delete-booking.dto";
import { User } from "../users/user.entity";
import { ApiTags } from "@nestjs/swagger";
import { SilentAuthGuard } from "../auth/guards/silent-auth.guard";

@ApiTags('Бронирование')
@Controller('booking')
export class BookingController {
    constructor(
        private readonly service: BookingService
    ) {
    }

    @UseGuards(SilentAuthGuard)
    @Post('create')
    create(@Body() dto: CreateBookingDto, @TakeUser() user: User) {
        return this.service.create(dto, user);
    }

    @UseGuards(SilentAuthGuard)
    @Post('cancel')
    cancel(@Body() dto: DeleteBookingDto, @TakeUser() user: User) {
        return this.service.delete(dto, user);
    }
}