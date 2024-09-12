import {Injectable} from "@nestjs/common";
import {InjectQueue} from "@nestjs/bull";
import { Queue } from 'bull';
import {InjectRepository} from "@nestjs/typeorm";
import {Vehicle} from "./entities/vehicle.entity";
import {Repository} from "typeorm";


@Injectable()
export class FileQueueService {

    constructor(
        @InjectQueue("file-processing")
        private fileProcessingQueue: Queue,
        @InjectRepository(Vehicle)
        private readonly vehicleRepository: Repository<Vehicle>,
    ) {}

    // Method to add a file processing job to the queue
    async processFile(filePath: string) {
        console.log(`Processing ${filePath}`);
        await this.fileProcessingQueue.add('read-file', { filePath });
    }

// Method to save a single row to the mysql database
    async saveRowsToDatabase(row: any): Promise<void> {
        try {

            const car_age = this.calculateVehicleAge(row.manufactured_date);

            // Map the row data to the Vehicle entity structure
            const entity = this.vehicleRepository.create({
                id: row.id,                          // Map 'id' to first_name
                first_name: row.first_name,          // Map 'First Name' to first_name
                last_name: row.last_name,            // Map 'Last Name' to last_name
                email: row.email,                    // Map 'Email' to email
                car_make: row.car_make,              // Map 'Car Make' to car_make
                car_model: row.car_model,            // Map 'Car Model' to car_model
                vin: row.vin,                        // Map 'VIN' to vin
                manufactured_date: row.manufactured_date
                    ? new Date(row.manufactured_date) : null, // Convert to Date or null
                age_of_vehicle: car_age,
            });


            // Save the entity to the database
            await this.vehicleRepository.save(entity);
            console.log('Row saved:', entity);
        } catch (error) {
            console.error('Error saving row to database:', error);
        }
    }

    // Function to calculate vehicle age
    calculateVehicleAge(manufactureDate: string): number {
        // Parse the manufacture date
        const manufacture = new Date(manufactureDate);
        const currentDate = new Date();

        // Calculate the difference in years
        let age = currentDate.getFullYear() - manufacture.getFullYear();

        // Adjust if the manufacture date's month/day hasn't occurred yet in the current year
        const monthDiff = currentDate.getMonth() - manufacture.getMonth();
        const dayDiff = currentDate.getDate() - manufacture.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        return age;
    }
}