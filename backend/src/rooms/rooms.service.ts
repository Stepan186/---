import { InjectRepository } from "@mikro-orm/nestjs";
import { Room } from "./entities/room.entity";
import { EntityManager, EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
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
        return await this.em.execute(`select *
                                      from room
                                      where id not in (select room.id
                                                       from room
                                                                left join booking b on room.id = b.room_id
                                                       where (to_timestamp(${dto.checkIn}) > b.check_in and to_timestamp(${dto.checkIn}) < b.check_out)
                                                          or (to_timestamp(${dto.checkOut}) > b.check_in and to_timestamp(${dto.checkOut}) < check_out)
                                                          or (to_timestamp(${dto.checkIn}) < check_in and to_timestamp(${dto.checkOut}) > check_out));`);
    }
}

// select r.* from room r
// left join booking b on r.id = b.room_id
// except  (select r2.* from room r2 left join booking b2 on r2.id = b2.room_id where (b2.check_in, b2.check_out) OVERLAPS (${checkIn},${checkOut}) is true group by r2.id);