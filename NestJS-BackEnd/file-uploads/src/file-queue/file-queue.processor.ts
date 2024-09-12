import {Process, Processor} from "@nestjs/bull";
import { Job } from 'bull';
import * as fs from 'fs';
import * as xlsx from 'xlsx';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import {Vehicle} from "../vehicle/entities/vehicle.entity";
import {Repository} from "typeorm";
import * as csvParser from 'csv-parser';
import {FileQueueService} from "./file-queue.service";   // CSV parsing library

@Processor("file-processing")
export class FileQueueProcessor {

    constructor(
       @InjectRepository(Vehicle)
       private readonly vehicleRepository: Repository<Vehicle>,
       private readonly fileQueueService: FileQueueService,
    ) {}

    @Process("read-file")
    async handleFileProcessing(job: Job){
        console.log(job.name);
        const { filePath } = job.data;

        try {
            // Check the file extension
            const fileExtension = path.extname(filePath).toLowerCase();

            if (fileExtension === '.csv') {
                // Process CSV file
                await this.readFileStream(filePath);
                console.log('CSV file processed and data saved to database.');
            } else if (fileExtension === '.xlsx' || fileExtension === '.xls') {
                // Process Excel file
                await this.readExcelFile(filePath);
                console.log('Excel file processed and data saved to database.');
            } else {
                throw new Error('Unsupported file format');
            }
        } catch (error) {
            console.error('Error reading file:', error);
        }

            //await this.readFileStream(filePath);
            //console.log('File processed and data saved to database.');
        } catch (error) {
            console.error('Error reading file:', error);
        }

    // Read the file from the local storage
    private async readFileStream(filePath: string): Promise<any[]> {

        return new Promise((resolve, reject) => {
            const chunkSize = 500;
            let results = [];
            let fileIndex = 0;

            // Create a read stream from the file
            fs.createReadStream(filePath)
                .pipe(csvParser()) // Use csv-parser to parse CSV content
                .on('data', (row) => {
                    //console.log('Row:',row);
                    results.push(row); // Process each row
                    this.fileQueueService.saveRowsToDatabase(row);
                })
                .on('end', () => {
                    console.log(results.length);
                    //console.log(fileIndex);
                    resolve(results); // Resolve the promise with the collected results
                })
                .on('error', (error) => {
                    reject(error); // Handle errors
                });
        });
    }

    // Method for reading and processing Excel files
    private async readExcelFile(filePath: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            try {
                const workbook = xlsx.readFile(filePath);
                const sheetName = workbook.SheetNames[0]; // Assuming you process the first sheet
                const sheet = workbook.Sheets[sheetName];

                // Convert the sheet to JSON
                const data = xlsx.utils.sheet_to_json(sheet);

                // Process each row and save it to the database
                data.forEach((row) => {
                    this.fileQueueService.saveRowsToDatabase(row);
                    console.log(row);
                    console.log();
                });

                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }
}