import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@mikro-orm/nestjs";
import {EntityRepository} from "@mikro-orm/postgresql";
import {Queue} from "./entities/queue.entity";
import {createQueueDto} from "./dto/create-queue.dto";
import {getQueueDto} from "./dto/get-queue.dto";

@Injectable()
export class QueueService {
    constructor(@InjectRepository(Queue) private repo: EntityRepository<Queue>,) {
    }

    async create(dto: createQueueDto): Promise<Queue> {
        const item = this.repo.create(dto);
        this.repo.getEntityManager().persistAndFlush(item);
        return item;
    }

    async getOne(dto: getQueueDto) {
        return await this.repo.findOneOrFail({id: dto.id});
    }
}