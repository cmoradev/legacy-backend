import { Body, Controller, Get, Post, Req, Res, Query } from '@nestjs/common';
import { AcademyDashBoardService } from './academy-dash-board-service';
import { CyclesService } from '../../school-colegio-ingles/cycles/cycles.service';
import * as moment from 'moment';
import { AcademyChargePaymentsService } from '../charges-academy/academy-charge-payments/academy-charge-payments.service';

@Controller()
export class AcademyDashBoardController {
  constructor(
    readonly service: AcademyDashBoardService,
    readonly serviceCycles: CyclesService,
    readonly serviceAcademyChargePayments: AcademyChargePaymentsService,
  ) {
  }

  @Get('load')
  index(@Query() query: { month: string, year: string, branchOfficeId: number, cycle: number; }) {
    try {
      return this.service.loadDash(query);
    } catch (e) {
      console.log('The error ', e);
    }
  }

  @Get('students-by-activity')
  async studentByActivity(@Query() query: { branchOfficeId: number, cycle: number; }) {
    try {
      const activities = await this.service.countStudentByActivity(query);
      const data = [];
      for (const activity of activities) {
        data.push({
          activity: activity.name,
          quantity: activity.academyActInscription.length,
        });
      }
      return data;
    } catch (e) {
      console.log('The error ', e);
    }
  }

  @Get('ingress-by-cycle')
  async ingressByCycle(@Query() query: { branchOfficeId: number, cycle: number; }) {
    const cycle = await this.serviceCycles.findOne({ where: { id: query.cycle } });
    const monsts: string[] = ['-01-01', '-02-01', '-03-01', '-04-01', '-05-01', '-06-01', '-07-01', '-08-01', '-09-01', '-10-01', '-11-01', '-12-01'];
    const years: { years: string, months: any[] }[] = [];
    const yearStart = moment(cycle.dateStart, 'DD/MM/YYYY').format('YYYY');
    const yearEnd = moment(cycle.dateEnd, 'DD/MM/YYYY').format('YYYY');
    years.push({ years: yearStart, months: [] });
    years.push({ years: yearEnd, months: [] });
    for (const month of monsts) {

      const firstMonthStart = moment(yearStart + month).startOf('month').format('YYYY-MM-DD');
      const firstMonthEnd = moment(yearStart + month).endOf('month').format('YYYY-MM-DD');
      const firstResult = await this.serviceAcademyChargePayments.countTotalPayments(firstMonthStart, firstMonthEnd, query.cycle, query.branchOfficeId);
      years[0].months.push({
        month: yearStart + month,
        monthStart: firstMonthStart,
        monthEnd: firstMonthEnd,
        quantity: firstResult.sum,
      });

      const secondMonthStart = moment(yearEnd + month).startOf('month').format('YYYY-MM-DD');
      const secondMonthEnd = moment(yearEnd + month).endOf('month').format('YYYY-MM-DD');
      const secondResult = await this.serviceAcademyChargePayments.countTotalPayments(secondMonthStart, secondMonthEnd, query.cycle, query.branchOfficeId);
      years[1].months.push({
        month: yearEnd + month,
        monthStart: secondMonthStart,
        monthEnd: secondMonthEnd,
        quantity: secondResult.sum,
      });
    }
    return years;
  }
}