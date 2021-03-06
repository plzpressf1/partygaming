import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { MailModule } from "./mail/mail.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [".env", "apps/pg/.env"],
        }),
        MongooseModule.forRoot(process.env.MONGO_URI),
        AuthModule,
        UserModule,
        MailModule,
    ],
})
export class AppModule {}
