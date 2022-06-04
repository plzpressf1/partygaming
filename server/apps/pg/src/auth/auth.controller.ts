import { Response } from "express";
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { Cookies } from "libs/decorators/src/cookies.decorator";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller("api/auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    readonly maxAge30d = 1000 * 60 * 60 * 24 * 30;

    @Post("login")
    @HttpCode(HttpStatus.OK)
    async auth(
        @Res({ passthrough: true }) response: Response, //
        @Body() credentials: AuthDto,
    ) {
        const tokens = await this.authService.auth(credentials);
        response.cookie(
            "refreshToken", //
            tokens.refreshToken,
            { maxAge: this.maxAge30d, httpOnly: true },
        );
        return { accessToken: tokens.accessToken };
    }

    @Get("refresh")
    @HttpCode(HttpStatus.OK)
    async refresh(
        @Res({ passthrough: true }) response: Response, //
        @Cookies("refreshToken") refreshToken: string,
    ) {
        const tokens = await this.authService.refreshAccessToken(refreshToken);
        response.cookie(
            "refreshToken", //
            tokens.refreshToken,
            { maxAge: this.maxAge30d, httpOnly: true },
        );
        return { accessToken: tokens.accessToken };
    }
}
