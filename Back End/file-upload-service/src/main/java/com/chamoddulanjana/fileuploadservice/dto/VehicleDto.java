package com.chamoddulanjana.fileuploadservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class VehicleDto {
    private String id;
    private String firstName;
    private String lastName;
    private String carMake;
    private String carModel;
    private String vin;
    private Date manufacturedDate;
}
