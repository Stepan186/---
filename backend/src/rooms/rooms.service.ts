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
        return await this.em.execute(`select r.*
                                      from booking b
                                               left join room r on b.room_id = r.id
                                      where (b.check_in, b.check_out) OVERLAPS
                                            (to_timestamp(${ dto.checkIn } / 1000),
                                             to_timestamp(${ dto.checkOut } / 1000)) != true
                                      group by r.id;`);
    }
}