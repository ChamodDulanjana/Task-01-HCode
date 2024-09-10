import {Process, Processor} from "@nestjs/bull";
import { Job } from 'bull';
import { promises as fsPromises } from 'fs';

@Processor("file-processing")
export class FileQueueProcessor {

    @Process("read-file")
    async handleFileProcessing(job: Job){
        console.log(job.name);
        const { filePath } = job.data;

        try {
            const fileData = await this.readFileAsync(filePath);
            //console.log('File data:', fileData);
            // Handle further processing of file data here
        } catch (error) {
            console.error('Error reading file:', error);
        }
    }

    // Read the file from the local storage asynchronously
    private async readFileAsync(filePath: string): Promise<string> {
        console.log(`Processing ${filePath} :processor`);
        const fileContents = await fsPromises.readFile(filePath, 'utf8');
        console.log(fileContents)
        return fileContents;
    }
}