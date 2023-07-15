import { InjectRepository } from "@mikro-orm/nestjs";
import { Room } from "./entities/room.entity";
import { EntityManager, EntityRepository } from "@mikro-orm/postgresql";
import { BadRequestException, Injectable } from "@nestjs/common";
import { GetRoomsDto } from "./dto/get-rooms.dto";

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Room)
        private repo: EntityRepository<Room>,
        private em: EntityManager
    ) {
    }

    async getMany(dto: GetRoomsDto) {
        if (dto.checkIn > dto.checkOut) {
            throw new BadRequestException('Неверно заполнены даты');
        }
        return await this.em.execute(`select r.*
                                      from room r
                                      except
                                      (select r2.*
                                       from room r2
                                                left join booking b2 on r2.id = b2.room_id
                                       where (b2.check_in, b2.check_out) OVERLAPS
                                             ('${ dto.checkIn }', '${ dto.checkOut }') is true);`);
        // return await this.em.execute(`select *
        //                               from room
        //                               where id not in (select room.id
        //                                                from room
        //                                                         left join booking b on room.id = b.room_id
        //                                                where (${ dto.checkIn } > b.check_in and ${ dto.checkIn } < b.check_out)
        //                                                   or (${ dto.checkOut } > b.check_in and ${ dto.checkOut } < check_out)
        //                                                   or (${ dto.checkIn } < check_in and ${ dto.checkOut } > check_out));`);
    }
}