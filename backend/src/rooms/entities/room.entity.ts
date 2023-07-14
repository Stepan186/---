import { BaseEntity, Collection, Entity, Enum, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Booking } from "../../booking/entities/booking.entity";

export enum RoomOptions {
    WIFI = "wifi",
    BREAKFAST = 'breakfast'
}

@Entity()
export class Room extends BaseEntity<Room, 'id'> {
    @PrimaryKey()
    id: number;

    @Property()
    title: string;

    @Property()
    description: string;

    @Property({ type: "decimal" })
    price: number;

    @OneToMany(() => Booking, 'room')
    booking = new Collection<Booking>(this);
}