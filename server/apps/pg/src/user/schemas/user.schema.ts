import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    login: string;

    @Prop()
    email: string;

    @Prop() // activation code, "" = user email confirmed
    code: string;

    @Prop()
    password: string;

    @Prop()
    name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
