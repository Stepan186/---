import {Entity, Enum, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {User} from "../../users/entities/user.entity";
import {Queue} from "../../queue/entities/queue.entity";
import {StatusEnum} from "../utils/enums/status.enum";

@Entity()
export class UserQueue {
    @PrimaryKey()
    id: number;

    @ManyToOne(() => User, {onDelete: 'cascade'})
    user = User;

    @ManyToOne(() => Queue, {onDelete: 'cascade'})
    queue = Queue;

    @Enum({default: StatusEnum.IN_PROGRESS})
    status?: StatusEnum;

    @Property()
    createdAt?: Date = new Date();

    @Property()
    updatedAt?: Date = new Date();
}