import { Request } from "@nestjs/common";
import { User } from "../../users/user.entity";

export interface IAuthorizedRequest extends Request {
    user: User
}