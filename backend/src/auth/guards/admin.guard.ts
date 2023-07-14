import { ExecutionContext, Injectable } from '@nestjs/common';
import { SilentAuthGuard } from './silent-auth.guard';
import { User } from "../../users/user.entity";

@Injectable()
export class AdminGuard extends SilentAuthGuard {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        await this.authorize(context);
        const { user }: { user?: User } = context.switchToHttp().getRequest();
        return !!user?.isAdmin;
    }
}
