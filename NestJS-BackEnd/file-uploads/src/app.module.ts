import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import {GraphQLModule} from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FileQueueModule } from './file-queue/file-queue.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Vehicle} from "./vehicle/entities/vehicle.entity";
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost', // Your database host
          port: 3306, // Your database port (default: 3306)
          username: 'root', // Your database username
          password: '1234', // Your database password
          database: 'vehicle_db', // Your database name
          entities: [Vehicle], // Array of your entities
          synchronize: true, // Set to `true` for development (auto-sync DB schema). Use `false` for production.
      }),
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: true,
      }),
      UploadModule,
      FileQueueModule,
      VehicleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
