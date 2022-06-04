import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [".env", "apps/pg/.env"],
        }),
        MongooseModule.forRoot(process.env.MONGO_URI),
    ],
})
export class AppModule {}
