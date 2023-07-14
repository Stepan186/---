import { Injectable } from "@nestjs/common";
import { MikroORM, UseRequestContext } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Booking } from "./entities/booking.entity";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Cron } from '@nestjs/schedule';

@Injectable()
export class BookingCronService {
    constructor(
        private orm: MikroORM,
        @InjectRepository(Booking)
        private repo: EntityRepository<Booking>
    ) {
    }

    @Cron('* */1 * * *')
    @UseRequestContext()
    async deleteExpiredBooking() {
        const currentDate = new Date();
        const bookings = await this.repo.find({ expiredAt: { $lte: currentDate } });
        await this.repo.getEntityManager().removeAndFlush(bookings);
    }
}