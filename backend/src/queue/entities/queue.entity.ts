import {Collection, Entity, OneToMany, PrimaryKey, Property} from "@mikro-orm/core";
import {UserQueue} from "../../user-queue/entities/user-queue.entity";

@Entity()
export class Queue {
    @PrimaryKey()
    id: number;

    @Property()
    cabinet: string;

    @OneToMany(() => UserQueue, queue => queue.queue)
    userQueue = new Collection<UserQueue>(this);
}