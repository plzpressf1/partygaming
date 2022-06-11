import { Response } from "express";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { TokenizedUser } from "@pg/interfaces";
import { Cookies } from "libs/decorators/src/cookies.decorator";
import { UserParam } from "libs/decorators";
import { JwtGuard } from "libs/jwt-guard";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller("api/auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    readonly maxAge30d = 1000 * 60 * 60 * 24 * 30;

    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login(
        @Res({ passthrough: true }) response: Response, //
        @Body() credentials: AuthDto,
    ) {
        const tokens = await this.authService.login(credentials);
        response.cookie(
            "refreshToken", //
            tokens.refreshToken,
            { maxAge: this.maxAge30d, httpOnly: true },
        );
        return { accessToken: tokens.accessToken };
    }

    @Delete("logout")
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async logout(
        @Res({ passthrough: true }) response: Response, //
        @UserParam() user: TokenizedUser,
    ) {
        await this.authService.logout(user.id);
        response.cookie("refreshToken", "");
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
