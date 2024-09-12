import { Injectable } from '@nestjs/common';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import {InjectRepository} from "@nestjs/typeorm";
import {Vehicle} from "./entities/vehicle.entity";
import {Repository} from "typeorm";
import {VehicleDto} from "./dto/model/vehicleDto";
import { plainToInstance } from 'class-transformer';

@Injectable()
export class VehicleService {

  constructor(
      @InjectRepository(Vehicle)
      private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async findAll(): Promise<VehicleDto[]> {
    const vehicleList: Vehicle[] = await this.vehicleRepository.find();
    return plainToInstance(VehicleDto, vehicleList);
  }


  async findOne(id: number): Promise<VehicleDto> {
    const vehicle: Vehicle = await this.vehicleRepository.findOne({where: {id}});

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    return plainToInstance(VehicleDto, vehicle);
  }


  async create(createVehicleInput: CreateVehicleInput): Promise<VehicleDto> {
    const age_of_vehicle = this.calculateVehicleAge(createVehicleInput.manufactured_date);
    const vehicleDto = new VehicleDto();
    vehicleDto.id = createVehicleInput.id;
    vehicleDto.first_name = createVehicleInput.first_name;
    vehicleDto.last_name = createVehicleInput.last_name;
    vehicleDto.email = createVehicleInput.email;
    vehicleDto.car_make = createVehicleInput.car_make;
    vehicleDto.car_model = createVehicleInput.car_model;
    vehicleDto.vin = createVehicleInput.vin;
    vehicleDto.manufactured_date = createVehicleInput.manufactured_date;
    vehicleDto.age_of_vehicle = age_of_vehicle;

    const vehicle: Vehicle = await this.vehicleRepository.save(vehicleDto);

    if (!vehicle) {
      throw new Error('Vehicle saving failed');
    }
    return plainToInstance(VehicleDto, vehicle);
  }

  async update(id: number, updateVehicleInput: UpdateVehicleInput): Promise<VehicleDto> {
    const vehicle = await this.vehicleRepository.update(id, updateVehicleInput);
    if (!vehicle) {
      throw new Error('Vehicle update failed');
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.vehicleRepository.delete(id);
    return result.affected ? true : false;
  }

  // Function to calculate vehicle age
  calculateVehicleAge(manufactureDate: Date): number {
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
