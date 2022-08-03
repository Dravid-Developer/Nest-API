import { Module } from '@nestjs/common';
import { TechsService } from './techs.service';
import { TechsController } from './techs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tech, TechSchema } from './schemas/tech.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tech.name, schema: TechSchema}])],
  controllers: [TechsController],
  providers: [TechsService]
})
export class TechsModule {}
