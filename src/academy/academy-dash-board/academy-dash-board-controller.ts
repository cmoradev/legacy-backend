import { Body, Controller, Get, Post, Req, Res, Query } from '@nestjs/common';
import {AcademyDashBoardService} from "./academy-dash-board-service";

@Controller()
export class AcademyDashBoardController {
    constructor(
        readonly service: AcademyDashBoardService,
    ) {
    }

    @Get('/load')
    index(@Query() query: { month: string, year: string, branchOfficeId: number, cycle: number; }) {
        try{
            return this.service.loadDash(query);
        }catch (e) {
            console.log("The error ", e);
        }
    }
}