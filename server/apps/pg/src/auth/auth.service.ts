import { compare, hash } from "bcrypt";
import { Model } from "mongoose";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { User } from "../user/schemas/user.schema";
import { Token, TokenDocument } from "./schemas/token.schema";
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Token.name) private tokensModel: Model<TokenDocument>, //
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async auth(credentials: AuthDto): Promise<{ accessToken: string; refreshToken: string }> {
        try {
            const user = await this.userService.getUserByLogin(credentials.login);
            const passwordEquals = await compare(credentials.password, user?.password);
            if (passwordEquals) {
                const tokens = this.generateTokens(user);
                await this.updateRefreshToken(user, tokens.refreshToken);
                return tokens;
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    async refreshAccessToken(refreshToken: string) {
        try {
            const tokenPayload = await this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            const token = await this.tokensModel //...
                .findOne({ user: tokenPayload.id })
                .populate({ path: "user", select: ["login", "name"] });

            const tokensEquals = await compare(refreshToken, token?.refreshToken);
            if (tokensEquals) {
                const tokens = this.generateTokens(token.user);
                await this.updateRefreshToken(token.user, tokens.refreshToken);
                return tokens;
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
        throw new UnauthorizedException();
    }

    private async updateRefreshToken(user: User, token: string) {
        const refreshToken = await hash(token, parseInt(process.env.BCRYPT_HASH_SALT_ROUNDS));
        await this.tokensModel.updateOne({ user }, { refreshToken }, { upsert: true });
    }

    private generateTokens(user: User) {
        const id = user["_id"].toString();
        return {
            accessToken: this.jwtService.sign(
                {
                    _id: user["_id"],
                    name: user.name,
                },
                {
                    secret: process.env.JWT_ACCESS_SECRET,
                    expiresIn: "15m",
                },
            ),
            refreshToken: this.jwtService.sign(
                {
                    id,
                },
                {
                    secret: process.env.JWT_REFRESH_SECRET,
                    expiresIn: "30d",
                },
            ),
        };
    }
}
