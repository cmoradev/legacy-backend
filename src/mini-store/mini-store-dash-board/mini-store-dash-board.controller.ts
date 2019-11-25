import { Controller, Get } from '@nestjs/common';
import { MiniStoreDashBoardService } from './mini-store-dash-board.service';

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
}
