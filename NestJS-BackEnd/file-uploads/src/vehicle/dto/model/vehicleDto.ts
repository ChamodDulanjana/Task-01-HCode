import {Field, Int, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class VehicleDto {

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

    @Field(() => Int, { nullable:true})
    age_of_vehicle: number;
}