import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PlantService } from './plant.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('plants')
@UseGuards(JwtAuthGuard)
export class PlantController {
  constructor(private plantService: PlantService) { }

  @Get()
  findAll() {
    return this.plantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.plantService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.plantService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantService.remove(id);
  }
}
