import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller()
export class StatsController {

    constructor(private readonly statsService: StatsService) {
    }

    @Get('sales-by-date-range')
    salesByDateRange(@Query() query: {
        startDate: string,
        endDate: string,
    }) {
        return this.statsService.salesRevenue(query);
    }

    @Get('sales-by-month-of-year')
    salesByMonthOfYear(@Query() query: { year: string }) {
        return this.statsService.salesByMonthsOfYear(query);
    }

    @Get('monthly-payment-methods-incomes')
    incomesByPaymentMethodAndMonthsOfYear(@Query() query: { year: string }) {
        return this.statsService.incomesByPaymentMethodAndMonthsOfYear(query);
    }
}
