import {Inject, Injectable} from "@nestjs/common";
import {InjectRepository} from "@mikro-orm/nestjs";
import {EntityRepository} from "@mikro-orm/postgresql";
import {UserQueue} from "./entities/user-queue.entity";
import {GetUserQueueDto} from "./dto/get-user-queue.dto";
import {StatusEnum} from "./utils/enums/status.enum";
import {QueueService} from "../queue/queue.service";

@Injectable()
export class UserQueueService {
    constructor(
        @InjectRepository(UserQueue) private repo: EntityRepository<UserQueue>,
        @Inject() queueService: QueueService) {
    }

    // async create(dto: CreateUserQueueDto): Promise<UserQueue> {
    //     const item = this.repo.create(dto);
    //     this.repo.getEntityManager().persistAndFlush(item);
    //     return item;
    // }

    async getCurrentQueue(dto: GetUserQueueDto) {
        return await this.repo.find({status: StatusEnum.IN_PROGRESS}, {populateWhere: {}});
    }
}