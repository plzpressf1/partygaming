import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtGuardService {
    constructor(private jwtService: JwtService) {}

    async parseAndVerifyAuthHeader(authHeader: string) {
        try {
            const bearer = authHeader.split(" ")[0];
            const token = authHeader.split(" ")[1];

            if (bearer === "Bearer" && token) {
                return await this.jwtService.verify(token, {
                    secret: process.env.JWT_ACCESS_SECRET,
                });
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
        throw new UnauthorizedException();
    }
}
