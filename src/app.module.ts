import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { TechsModule } from './techs/techs.module';
import  config  from './config/keys';

@Module({
  imports: [ItemsModule, MongooseModule.forRoot(config.mongoURI), TechsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}