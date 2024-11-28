import {BaseEntity, Collection, Entity, OneToMany, OptionalProps, PrimaryKey, Property} from '@mikro-orm/core';
import {Queue} from "../../queue/entities/queue.entity";
import {UserQueue} from "../../user-queue/entities/user-queue.entity";

@Entity()
export class User extends BaseEntity<User, 'uuid'> {
    [OptionalProps]: 'firstName' | 'lastName' | 'createdAt' | 'updatedAt' | 'isAdmin' | 'fullName';

    @PrimaryKey({type: 'uuid', defaultRaw: 'gen_random_uuid()'})
    uuid: string;

    @Property()
    firstName?: string;

    @Property()
    lastName?: string;

    @Property({default: false})
    isAdmin: boolean;

    @Property()
    createdAt: Date = new Date();

    @Property()
    updatedAt: Date = new Date();

    @Property()
    email: string;

    @Property({hidden: true})
    password: string;

    @OneToMany(() => UserQueue, queue => queue.queue)
    userQueue = new Collection<Queue>(this);

    @Property({persist: false})
    get fullName() {
        return [this.lastName, this.firstName].filter(i => i).join(' ') || `Пользователь`;
    }

}
