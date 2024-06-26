import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    Res,
    UseGuards,
} from "@nestjs/common";
import { VoucherService } from "./voucher.service";
import { Voucher } from "./interfaces";
import { CreateVoucherDto, ReceiveVoucherDto } from "./dto";
import { UpdateVoucherDto } from "./dto/edit-voucher.dto";
import { JwtGuard } from "src/auth/guard";

@Controller("voucher")
export class VoucherController {
    constructor(private voucherService: VoucherService) {}

    @Post("recieve")
    receiveVoucher(@Body() dto: ReceiveVoucherDto) {
        return this.voucherService.receiveVoucher({ dto: dto });
    }

    @Get("wallet-address")
    getVoucherByWalletAddress(@Query("walletAddress") walletAddress: string) {
        return this.voucherService.getVoucherByWalletAddress({ walletAddress: walletAddress });
    }

    @UseGuards(JwtGuard)
    @Get()
    getAllVouchers(
        @Query("status") status: string,
        @Query("categoryName") categoryName: string,
        @Query("page") page: number = 1,
        @Query("pageSize") pageSize: number = 12,
    ): Promise<{ totalPage: number; vouchers: Array<Voucher> }> {
        return this.voucherService.getAllVouchers({
            status: status,
            page: page,
            pageSize: pageSize,
            categoryName: categoryName,
        });
    }

    @UseGuards(JwtGuard)
    @Post()
    createVoucher(@Body() dto: CreateVoucherDto[]) {
        return this.voucherService.createVoucher({ dto: dto });
    }

    @UseGuards(JwtGuard)
    @Get(":id")
    getVoucherById(@Param("id") id: string) {
        return this.voucherService.getVoucherById({ id: id });
    }

    @UseGuards(JwtGuard)
    @Patch(":id")
    updateVoucherById(@Param("id") id: string, @Body() dto: UpdateVoucherDto) {
        return this.voucherService.updateVoucher({ id: id, dto: dto });
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(":id")
    deleteVoucherById(@Param("id") id: string) {
        return this.voucherService.deleteVoucher({ id: id });
    }
}
