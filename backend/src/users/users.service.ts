import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './user.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { GetUserDto } from "./dto/get-user.dto";
import { FilterQuery } from "@mikro-orm/core";
import { createValidationException } from "@1creator/backend";
import { CryptoService } from "../auth/auth/crypto.service";
import { RegistrationDto } from "../auth/auth/dto/registration-dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private repo: EntityRepository<User>,
        private readonly cryptoService: CryptoService,
    ) {
    }

    async get(dto: GetUserDto) {
        return await this.repo.findOneOrFail(dto);
    }

    // async getOrCreate(dto: { email: string }, data?: Partial<User>): Promise<[User, boolean]> {
    //     const where: FilterQuery<User> = { email: dto.email };
    //     try {
    //         return [await this.repo.findOneOrFail(where), false];
    //     } catch (e) {
    //         const item = this.repo.create({ email: dto.email, ...data });
    //         await this.repo.getEntityManager().flush();
    //         return [item, true];
    //     }
    // }

    async isExists(dto: GetUserDto, exceptUuid?: string) {
        try {
            const where: FilterQuery<User> = dto;
            if (exceptUuid) {
                where.uuid = { $ne: exceptUuid };
            }
            await this.repo.findOneOrFail(where);
            return true;
        } catch (e) {
            return false;
        }
    }

    async store(dto: RegistrationDto, _currentUser?: User): Promise<User> {
        if (await this.isExists({ email: dto.email })) {
            throw createValidationException({ email: ['Данный электронный адрес уже занят'] });
        }

        if (dto.password) {
            dto.password = await this.cryptoService.bcrypt(dto.password);
        }
        const item = this.repo.create(dto);

        await this.repo.getEntityManager().persistAndFlush(item);

        return item;
    }
}
