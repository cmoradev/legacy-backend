import { Body, Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { MiniStoreDashBoardService } from './mini-store-dash-board.service';
import { Response } from 'express';
import { MyIngresDto } from './dto/myIngres.dto';

@Controller()
export class MiniStoreDashBoardController {
    constructor(
        readonly service: MiniStoreDashBoardService,
    ) {
    }

    @Get('/')
    async index() {
        return this.service.loadDash();
    }

    @Post('my-income')
    async myIncome(@Body() myIngresDto: MyIngresDto, @Res() res: Response) {
        const jwt = await this.service.myIncome(myIngresDto.date, myIngresDto.id);
        res.status(201).json(jwt);
    }

    @Get('cashier-sales')
    async cashierSales(@Query() query: { startDate: string, endDate: string, branchOfficeId: number; }, @Res() res: Response) {
        const jwt = await this.service.cashierSales(query);
        res.send(jwt);
    }

    @Get('salesGraphic')
    async salesGraph(@Query() query: { month: string, year: string }, @Res() res: Response) {
        const jwt = await this.service.salesGraphic(query);
        res.send(jwt);
    }

}
