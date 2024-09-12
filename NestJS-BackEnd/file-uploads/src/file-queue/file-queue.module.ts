import { Module } from '@nestjs/common';
import {BullModule} from "@nestjs/bull";
import {FileQueueService} from "./file-queue.service";
import {FileQueueProcessor} from "./file-queue.processor";
import {Vehicle} from "../vehicle/entities/vehicle.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[
        BullModule.forRoot({
            redis: {
                host: 'localhost',
                port: 6379
            }
        }),
        BullModule.registerQueue({
           name: 'file-processing',  // Queue name for background tasks
        }),
        TypeOrmModule.forFeature([Vehicle]),
    ],
    providers: [FileQueueService, FileQueueProcessor],
    exports: [FileQueueService],
})
export class FileQueueModule {}
