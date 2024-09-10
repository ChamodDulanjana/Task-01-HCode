import {Injectable} from "@nestjs/common";
import {InjectQueue} from "@nestjs/bull";
import { Queue } from 'bull';


@Injectable()
export class FileQueueService {

    constructor(@InjectQueue("file-processing") private fileProcessingQueue: Queue) {}

    // Method to add a file processing job to the queue
    async processFile(filePath: string) {
        console.log(`Processing ${filePath}`);
        await this.fileProcessingQueue.add('read-file', { filePath });
    }
}