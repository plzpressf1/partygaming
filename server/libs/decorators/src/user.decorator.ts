import { createParamDecorator } from "@nestjs/common";

export const UserParam = createParamDecorator((_, context: any) => {
    return context.switchToHttp().getRequest().user;
});
