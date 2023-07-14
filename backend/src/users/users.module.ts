import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Module({
    imports: [MikroOrmModule.forFeature([User])],
    exports: [UsersService],
    controllers: [],
    providers: [UsersService],
})
export class UsersModule {
}
