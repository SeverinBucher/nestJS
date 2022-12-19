import { Injectable } from '@nestjs/common';
import { numberFormat } from 'highcharts';
import { ComputerController } from 'src/computer/computer.controller';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
  constructor(private powerService: PowerService) {}

  compute(a: number, b: number) {
    console.log('drawing 10 watts');
    this.powerService.supplyPower(10);
    return a + b;
  }
}
