import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { HrService } from './hr.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('hr-management')
@UseGuards(AuthGuard('jwt'))
export class HrController {
  constructor(private hrService: HrService) { }

  @Get()
  findAll() {
    return this.hrService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hrService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.hrService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.hrService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.hrService.delete(id);
    return { success: true };
  }
}
