import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtGuardService } from "./jwt-guard.service";

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(private jwtGuardService: JwtGuardService) {}

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        req.user = await this.jwtGuardService.parseAndVerifyAuthHeader(req.headers.authorization);
        return true;
    }
}
