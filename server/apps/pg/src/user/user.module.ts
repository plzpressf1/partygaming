import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtGuardModule } from "libs/jwt-guard/src/jwt-guard.module";
import { MailModule } from "../mail/mail.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User, UserSchema } from "./schemas/user.schema";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), //
        JwtGuardModule,
        MailModule,
    ],
    exports: [UserService],
})
export class UserModule {}
