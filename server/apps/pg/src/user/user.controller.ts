import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtGuard } from "libs/jwt-guard/src/jwt.guard";
import { TokenizedUser } from "libs/interfaces";
import { UserParam } from "libs/decorators";
import { UserService } from "./user.service";

@Controller("api/user")
export class UserController {
    constructor(private userService: UserService) {}

    @Get("me")
    @UseGuards(JwtGuard)
    async me(@UserParam() user: TokenizedUser) {
        return await this.userService.getUserById(user.id);
    }
}
