import { Module } from '@nestjs/common';
import {BullModule} from "@nestjs/bull";
import {FileQueueService} from "./file-queue.service";
import {FileQueueProcessor} from "./file-queue.processor";

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
    ],
    providers: [FileQueueService, FileQueueProcessor],
    exports: [FileQueueService],
})
export class FileQueueModule {}
