import { BaseEntity, Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User extends BaseEntity<User, 'uuid'> {
    [OptionalProps]: 'firstName' | 'lastName' | 'createdAt' | 'updatedAt' | 'isAdmin' | 'fullName' | 'isVip';

    @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
    uuid: string;

    @Property()
    firstName?: string;

    @Property()
    lastName?: string;

    @Property({ default: false })
    isAdmin: boolean;

    @Property()
    createdAt: Date = new Date();

    @Property()
    updatedAt: Date = new Date();

    @Property()
    email: string;

    @Property({ hidden: true })
    password: string;

    @Property({ default: false })
    isVip: boolean;

    @Property({ persist: false })
    get fullName() {
        return [this.lastName, this.firstName].filter(i => i).join(' ') || `Пользователь`;
    }

}
