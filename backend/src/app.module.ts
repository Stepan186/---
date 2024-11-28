import {Module, OnModuleInit} from '@nestjs/common';
import {MikroOrmModule} from '@mikro-orm/nestjs';
import mikroOrmConfig from './mikro-orm.config';
import {ConfigModule} from '@nestjs/config';
import {UsersModule} from './users/users.module';
import {BullModule} from '@nestjs/bull';
import {EventEmitterModule} from '@nestjs/event-emitter';
import {MikroORM} from '@mikro-orm/core';
import {AuthModule} from "./auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        BullModule.forRoot({
            redis: {
                host: process.env.REDIS_HOST,
                port: +process.env.REDIS_PORT!,
            },
        }),
        MikroOrmModule.forRootAsync({useFactory: mikroOrmConfig}),
        // CacheModule.register({
        //     store: redisStore,
        //     host: process.env.REDIS_HOST,
        //     port: process.env.REDIS_PORT,
        //     isGlobal: true,
        // }),
        EventEmitterModule.forRoot(),
        UsersModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule implements OnModuleInit {
    constructor(private readonly orm: MikroORM) {
    }

    async onModuleInit(): Promise<void> {
        try {
            await this.orm.getMigrator().up();
        } catch (e) {
            console.error(e);
        }
    }
}
