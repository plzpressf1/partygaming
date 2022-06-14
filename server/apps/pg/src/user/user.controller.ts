import { BadRequestException, Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { TokenizedUser } from "@pg/interfaces";
import { JwtGuard } from "libs/jwt-guard/src/jwt.guard";
import { UserParam } from "libs/decorators";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("api/user")
export class UserController {
    constructor(private userService: UserService) {}

    @Get("me")
    @UseGuards(JwtGuard)
    async me(@UserParam() user: TokenizedUser): Promise<TokenizedUser> {
        const userDoc = await this.userService.getUserById(user.id);
        return {
            id: userDoc._id,
            name: userDoc.name,
        };
    }

    @Post("create")
    async create(@Body() dto: CreateUserDto) {
        const errors = await this.userService.create(dto);
        if (errors.length) throw new BadRequestException(errors);
    }
}
