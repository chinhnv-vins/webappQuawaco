import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private dashboardService: DashboardService) { }

  @Get('general')
  getGeneralData() {
    return this.dashboardService.getGeneralData();
  }

  @Get('production')
  getProductionData(@Query() query: Record<string, string>) {
    return this.dashboardService.getProductionData(query);
  }

  @Get('business')
  getBusinessData(@Query() query: Record<string, string>) {
    return this.dashboardService.getBusinessData(query);
  }

  @Get('network')
  getNetworkData(@Query() query: Record<string, string>) {
    return this.dashboardService.getNetworkData(query);
  }

  @Get('hr')
  getHrData(@Query() query: Record<string, string>) {
    return this.dashboardService.getHrData(query);
  }

  @Get('agent')
  getAgentData(@Query() query: Record<string, string>) {
    return this.dashboardService.getAgentData(query);
  }
}
