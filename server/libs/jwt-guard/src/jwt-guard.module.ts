import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtGuardService } from "./jwt-guard.service";

@Module({
    providers: [JwtGuardService],
    imports: [JwtModule.register({})],
    exports: [JwtGuardService],
})
export class JwtGuardModule {}
