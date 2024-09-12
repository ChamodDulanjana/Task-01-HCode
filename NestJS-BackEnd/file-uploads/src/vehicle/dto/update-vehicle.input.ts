import { CreateVehicleInput } from './create-vehicle.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVehicleInput extends PartialType(CreateVehicleInput) {

  @Field(() => Int)
  id: number;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String)
  email: string;

}
