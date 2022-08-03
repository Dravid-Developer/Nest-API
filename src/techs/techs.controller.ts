import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TechsService } from './techs.service';
import { CreateTechDto } from './dto/create-tech.dto';
import { UpdateTechDto } from './dto/update-tech.dto';

@Controller('techs')
export class TechsController {
  constructor(private readonly techsService: TechsService) {}

  @Post()
  create(@Body() createTechDto: CreateTechDto) {
    return this.techsService.create(createTechDto);
  }

  @Get()
  findAll() {
    return this.techsService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.techsService.findOne(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateTechDto: UpdateTechDto) {
    return this.techsService.update(name, updateTechDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.techsService.remove(name);
  }
}
