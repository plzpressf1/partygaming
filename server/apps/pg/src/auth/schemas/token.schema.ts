import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../user/schemas/user.schema";

export type TokenDocument = Token & Document;

@Schema()
export class Token {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    user: User;

    @Prop()
    refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
