import { randomUUID } from "crypto";
import { hash } from "bcrypt";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { MailService } from "../mail/mail.service";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private usersModel: Model<UserDocument>, //
        private mailService: MailService,
    ) {}

    async getUserById(id: string) {
        return this.usersModel.findById(id);
    }

    async getUserByLogin(login: string) {
        return this.usersModel.findOne({ login });
    }

    async create(dto: CreateUserDto) {
        const errors = [];
        const user = await this.usersModel.findOne({ $or: [{ login: dto.login }, { email: dto.email }] });
        if (user) {
            if (user.login === dto.login) errors.push({ login: "IN_USE" });
            if (user.email === dto.email) errors.push({ email: "IN_USE" });
        }
        if (dto.password.length < 5) errors.push({ password: "LENGTH", payload: 5 });

        if (errors.length === 0) {
            dto.password = await hash(dto.password, parseInt(process.env.BCRYPT_HASH_SALT_ROUNDS));
            const createdUser = await this.usersModel.create({ ...dto, code: randomUUID() });
            this.mailService.sendEmailConfirmation(createdUser);
        }

        return errors;
    }
}
