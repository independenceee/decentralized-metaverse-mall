import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { RoadmapService } from "./roadmap.service";
import { CreateRoadmapDto, EditRoadmapDto } from "./dto";
import { JwtGuard } from "src/auth/guard";

@Controller("roadmap")
export class RoadmapController {
    constructor(private roadmapService: RoadmapService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    async getRoadmaps() {
        return await this.roadmapService.getRoadmaps();
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    @Get(":id")
    async getRoadmapById(@Param("id") id: string) {
        return await this.roadmapService.getRoadmapById({ id: id });
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    @Post()
    async createRoadmap(@Body() dto: CreateRoadmapDto) {
        return await this.roadmapService.createRoadmap({ dto: dto });
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    @Patch(":id")
    async editRoadmap(@Param("id") id: string, @Body() dto: EditRoadmapDto) {
        return await this.roadmapService.editRoadmap({ id: id, dto: dto });
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    @Delete(":id")
    async deleteRoadmap(@Param("id") id: string) {
        return await this.roadmapService.deteleRoadmap({ id: id });
    }
}
