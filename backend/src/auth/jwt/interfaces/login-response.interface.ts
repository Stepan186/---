import { User } from "../../../users/user.entity";


export interface ILoginResponse {
    tokens: {
        accessToken: string,
        refreshToken: string,
    };
    user: User;
}