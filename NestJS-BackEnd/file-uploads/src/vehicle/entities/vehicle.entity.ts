import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType} from "@nestjs/graphql";

@ObjectType() // GraphQL decorator
@Entity() // TypeORM decorator
export class Vehicle{

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({nullable:false})
  first_name: string;

  @Field(() => String)
  @Column({nullable:false})
  last_name: string;

  @Field(() => String)
  @Column({nullable:false})
  email: string;

  @Field(() => String)
  @Column({nullable:false})
  car_make: string;

  @Field(() => String)
  @Column({nullable:false})
  car_model: string;

  @Field(() => String)
  @Column({nullable:false})
  vin: string;

  @Field(() => String)
  @Column({nullable:false})
  manufactured_date: Date;

  @Field(() => Int)
  @Column({nullable:true})
  age_of_vehicle: number;
}