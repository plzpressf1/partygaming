import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Token, TokenSchema } from "./schemas/token.schema";

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [
        MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]), //
        JwtModule.register({}),
        forwardRef(() => UserModule),
    ],
})
export class AuthModule {}
