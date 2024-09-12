import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { parse } from 'csv-parse';
import {FileUpload} from "graphql-upload-ts";
import { mkdirSync, existsSync } from 'fs';
import {FileQueueService} from "../file-queue/file-queue.service";

@Injectable()
export class UploadService {

    constructor(private readonly fileQueueService: FileQueueService) {}

    uploadCsvFile(file: FileUpload): Promise<boolean> {
        const { createReadStream, filename } = file;

        // Ensure the directory exists
        const directory = 'D://save';
        if (!existsSync(directory)) {
            mkdirSync(directory, { recursive: true });
        }

        const savePath = join('D://save', filename);
        this.fileQueueService.processFile(savePath);

        // Create a writable stream to the specified path
        const writeStream = createWriteStream(savePath);

        // Pipe the file read stream to the write stream
        return new Promise((resolve, reject) =>
            createReadStream()
                .pipe(writeStream)
                .on('finish', () => resolve(true))
                .on('error', (error) => reject(false))
        );
    }

}
