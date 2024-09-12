import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadResolver } from './upload.resolver';
import {FileQueueService} from "../file-queue/file-queue.service";
import {FileQueueModule} from "../file-queue/file-queue.module";

@Module({
  imports:[FileQueueModule],  // Import the module that exports FileQueueService
  providers: [UploadResolver, UploadService],
})
export class UploadModule {}
