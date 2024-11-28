import {Injectable} from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import {RegistrationDto} from './dto/registration-dto';
import {UsersService} from '../../users/users.service';
import {CryptoService} from './crypto.service';
import {IDeviceDataMeta} from '../jwt/interfaces/device-data.interface';
import {ILoginResponse} from '../jwt/interfaces/login-response.interface';
import {JwtService} from '../jwt/jwt.service';
import {createValidationException} from '@1creator/backend';
import {User} from "../../users/entities/user.entity";


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly passwordService: CryptoService,
        private readonly jwtService: JwtService,
    ) {
    }

    async login(dto: LoginDto, deviceData: IDeviceDataMeta): Promise<ILoginResponse> {
        let user: User;
        try {
            user = await this.usersService.get({email: dto.email});
            await this.passwordService.compareBcrypt(dto.password, user.password!);
        } catch (e) {
            throw createValidationException({password: ['Неверный пароль']});
        }

        const tokens = await this.jwtService.createTokens(deviceData, user);
        return {tokens, user};
    }

    async register(dto: RegistrationDto, deviceData: IDeviceDataMeta): Promise<ILoginResponse> {
        if (
            await this.usersService.isExists({email: dto.email})
        ) {
            throw createValidationException({email: ['Пользователь с такой электронной почтой уже существует']});
        }

        const user = await this.usersService.store(dto);

        const tokens = await this.jwtService.createTokens(deviceData, user);
        return {tokens, user};
    }

}
