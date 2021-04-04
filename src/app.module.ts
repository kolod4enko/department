import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      load: [configuration],
      isGlobal: true,
      expandVariables: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
