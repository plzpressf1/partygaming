import { join } from "path";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MailService } from "./mail.service";

@Module({
    providers: [MailService],
    imports: [
        ConfigModule.forRoot({
            envFilePath: ["apps/pg/.env"],
        }),
        MailerModule.forRoot({
            transport: {
                host: process.env.MAIL_SMTP,
                port: parseInt(process.env.MAIL_PORT),
                secure: true,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD,
                },
            },
            defaults: {
                from: '"No Reply" ' + process.env.MAIL_FROM,
            },
            template: {
                dir: join(__dirname, "mail/templates"),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    exports: [MailService],
})
export class MailModule {}
