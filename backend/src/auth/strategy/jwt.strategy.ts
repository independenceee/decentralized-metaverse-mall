import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(
        protected config: ConfigService,
        private prisma: PrismaService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get("ACCESSTOKEN_SECRET_KEY"),
        });
    }

    async validate({ id, email, role }: { id: string; role: string; email: string }) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email,
                id: id,
                role: role,
            },
        });
        if (!user) {
            throw new UnauthorizedException();
        }

        if (user.role !== role) {
            throw new UnauthorizedException("User does not have the required role.");
        }

        delete user.password;
        return user;
    }
}
