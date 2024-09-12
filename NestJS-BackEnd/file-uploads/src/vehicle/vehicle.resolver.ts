import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import {VehicleDto} from "./dto/model/vehicleDto";

@Resolver(() => Vehicle)
export class VehicleResolver {
  constructor(private readonly vehicleService: VehicleService) {}

  @Query(() => [VehicleDto], { name: 'vehicles' })
  async findAll() : Promise<VehicleDto[]>{
    return await this.vehicleService.findAll();
  }

  @Query(() => VehicleDto, { name: 'vehicle' })
  async getVehicleById(@Args('id', { type: () => Int }) id: number) : Promise<VehicleDto> {
    return await this.vehicleService.findOne(id);
  }

  @Mutation(() => VehicleDto)
  createVehicle(@Args('createVehicleInput') createVehicleInput: CreateVehicleInput) : Promise<VehicleDto> {
    return this.vehicleService.create(createVehicleInput);
  }

  @Mutation(() => VehicleDto)
  async updateVehicle(@Args('updateVehicleInput') updateVehicleInput: UpdateVehicleInput) : Promise<VehicleDto> {
      return await this.vehicleService.update(updateVehicleInput.id, updateVehicleInput);
  }

  @Mutation(() => Boolean)
  removeVehicle(@Args('id', { type: () => Int }) id: number) : Promise<boolean> {
    return this.vehicleService.remove(id);
  }
}
