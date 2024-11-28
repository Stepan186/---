import {Module} from '@nestjs/common';
import {MikroOrmModule} from '@mikro-orm/nestjs';
import {User} from './entities/user.entity';
import {UsersService} from './users.service';

@Module({
    imports: [MikroOrmModule.forFeature([User])],
    exports: [UsersService],
    controllers: [],
    providers: [UsersService],
})
export class UsersModule {
}
