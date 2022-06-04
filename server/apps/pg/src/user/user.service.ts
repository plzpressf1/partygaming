import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private usersModel: Model<UserDocument>) {}

    async getUserById(id: string) {
        return this.usersModel.findById(id);
    }

    async getUserByLogin(login: string) {
        return this.usersModel.findOne({ login });
    }
}
