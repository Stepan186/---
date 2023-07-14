import { BaseEntity, Entity, ManyToOne, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { Room } from "../../rooms/entities/room.entity";
import { User } from "../../users/user.entity";

@Entity()
export class Booking extends BaseEntity<Booking, 'uuid'> {
    [OptionalProps]: 'createdAt';

    @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
    uuid: string;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Room)
    room: Room;

    @Property()
    checkIn: Date;

    @Property()
    checkOut: Date;

    @Property()
    expiredAt: Date;

    @Property({ default: false })
    isVip?: boolean;
}