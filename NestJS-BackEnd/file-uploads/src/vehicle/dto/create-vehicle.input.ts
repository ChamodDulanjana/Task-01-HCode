import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVehicleInput {

  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  car_make: string;

  @Field(() => String)
  car_model: string;

  @Field(() => String)
  vin: string;

  @Field(() => Date)
  manufactured_date: Date;
}
