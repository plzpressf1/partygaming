import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { UserDocument } from "../user/schemas/user.schema";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    sendEmailConfirmation(user: UserDocument) {
        const url = `${process.env.MAIL_APP_URL}/user/confirm?code=${user.code}`;
        this.mailerService
            .sendMail({
                to: user.email,
                subject: `Добро пожаловать на ${process.env.MAIL_APP_NAME}!`,
                template: "confirmation",
                context: {
                    name: user.login,
                    site: process.env.MAIL_APP_NAME,
                    url,
                },
            })
            .then()
            .catch((e) => console.log(e));
    }
}
