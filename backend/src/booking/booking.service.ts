import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Booking } from "./entities/booking.entity";
import { EntityRepository } from "@mikro-orm/postgresql";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { DeleteBookingDto } from "./dto/delete-booking.dto";
import { User } from "../users/user.entity";
import { RoomsService } from "../rooms/rooms.service";

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private repo: EntityRepository<Booking>,
        private readonly roomsService: RoomsService
    ) {
    }

    async create(dto: CreateBookingDto, currentUser: User) {
        const freeRooms = await this.roomsService.getMany({ checkIn: dto.checkIn, checkOut: dto.checkOut });
        console.log(freeRooms);
        const isFree = freeRooms.filter(r => dto.room === r.id).length;
        if (!isFree) {
            throw new BadRequestException('В эти даты номер уже забронирован');
        }

        if (currentUser.isVip) {
            dto.isVip = true;
        }

        const expiredDate = new Date();
        expiredDate.setDate(expiredDate.getMinutes() + 15);
        const booking = this.repo.create({ ...dto, user: currentUser, expiredAt: expiredDate });
        await this.repo.getEntityManager().flush();
        return booking;
    }

    async delete(dto: DeleteBookingDto, currentUser: User) {
        const booking = await this.repo.findOneOrFail({ uuid: dto.uuid }, { populate: ["user"] });
        if (booking.user != currentUser && !currentUser.isAdmin) {
            throw new ForbiddenException('В доступе отказано');
        }
        await this.repo.getEntityManager().removeAndFlush(booking);
        return booking;
    }
}