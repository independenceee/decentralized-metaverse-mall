import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, EditUserDto } from "./dto";
import { JwtGuard } from "src/auth/guard";

@Controller("user")
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getUser(@Param("id") id: string) {
        return this.userService.getUser({ id: id });
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    @Post()
    createUser(@Body() dto: CreateUserDto) {
        return this.userService.createUser({ dto: dto });
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    @Patch(":id")
    editUser(@Param("id") id: string, @Body() dto: EditUserDto) {
        return this.userService.updateUser({ id: id, dto: dto });
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    @Delete(":id")
    deleteUser(@Param("id") id: string) {
        return this.userService.deleteUser({ id: id });
    }
}
