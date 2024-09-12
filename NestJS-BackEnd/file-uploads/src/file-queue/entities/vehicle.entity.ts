import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity("vehicle")
export class Vehicle{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    first_name: string;

    @Column({nullable:false})
    last_name: string;

    @Column({nullable:false})
    email: string;

    @Column({nullable:false})
    car_make: string;

    @Column({nullable:false})
    car_model: string;

    @Column({nullable:false})
    vin: string;

    @Column({nullable:false})
    manufactured_date: Date;

    @Column({nullable:true})
    age_of_vehicle: number;
}