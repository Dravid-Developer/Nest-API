import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTechDto } from './dto/create-tech.dto';
import { UpdateTechDto } from './dto/update-tech.dto';
import { Tech, TechDocument } from './schemas/tech.schema';

@Injectable()
export class TechsService {
  constructor(@InjectModel(Tech.name) private techModel: Model<TechDocument>) {}

  async create(createTechDto: CreateTechDto): Promise<Tech> {
    return new this.techModel(createTechDto).save();
  }

  async findAll() {
    return this.techModel.find();
  }

  async findOne(name: string) {
    return this.techModel.findOne ({ name });
  }

  async update(name: string, updateTechDto: UpdateTechDto) {
    return this.techModel.updateOne({name}, {$set: { ...updateTechDto }})
  }

  async remove(name: string) {
    return this.techModel.deleteOne({name});
  }
}
