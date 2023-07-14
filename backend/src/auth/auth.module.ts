import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { CryptoService } from './auth/crypto.service';
import { UsersModule } from '../users/users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RefreshTokenMeta } from './jwt/entities/refresh-token-meta.entity';
import { JwtService } from './jwt/jwt.service';
import { User } from "../users/user.entity";

@Global()
@Module({
    imports: [
        MikroOrmModule.forFeature([User, RefreshTokenMeta]),
        UsersModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        CryptoService,
        JwtService,
    ],
    exports: [AuthService, CryptoService, JwtService],
})
export class AuthModule {
}
