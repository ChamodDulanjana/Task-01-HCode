package com.chamoddulanjana.fileuploadservice.service.impl;

import com.chamoddulanjana.fileuploadservice.dto.VehicleDto;
import com.chamoddulanjana.fileuploadservice.service.CsvQueueService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import redis.clients.jedis.Jedis;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CsvQueueServiceImpl implements CsvQueueService {

    private final JedisConnectionFactory jedisConnectionFactory;
    private static final String REDIS_QUEUE = "csvQueue";

    @Override
    public void storeFileIntoStorage(MultipartFile file) {
        if (file.isEmpty()) {
            System.out.println("File is empty!");
            return;
        }

        // Create the directory if it doesn't exist
        File dir = new File("E:\\Save csv file");
        if (!dir.exists()) {
            dir.mkdirs();
        }

        // Create the target file path
        Path filePath = Paths.get("E:\\Save csv file", file.getOriginalFilename());

        try {
            // Save the uploaded file to the target directory
            Files.write(filePath, file.getBytes());
            System.out.println("File saved successfully to " + filePath.toString());

        } catch (IOException e) {
            System.out.println("Error saving file: " + e.getMessage());
        }
        retrieveFileFromStorage();
    }


    public void retrieveFileFromStorage() {


    }

    public void retrieveRedisQueue(MultipartFile file) {
        try (Jedis jedis = new Jedis(jedisConnectionFactory.getHostName(), jedisConnectionFactory.getPort())) {

            // Check the size of the Redis queue
            long queueSize = jedis.llen(REDIS_QUEUE);
            System.out.println("Queue Size: " + queueSize);

            //If you want to just view the data without removing, you can use lrange
            for (int i = 0; i < queueSize; i++) {
                List<String> allItems = jedis.lrange(REDIS_QUEUE, 0, -1); // Retrieve all elements
                //allItems.forEach(System.out::println);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /*public void processCsvInChunks(){
        int chunkSize = 100;

        List<VehicleDto> vehicleDtoList = new ArrayList<>();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String line;

        try {
            // Skip header
            //String header = reader.readLine();

            // Read the file in chunks
            while ((line = reader.readLine()) != null) {
                //System.out.println(line);
                String[] data = line.split(",");
                String id = data[0];
                String firstName = data[1];
                String lastName = data[2];
                String email = data[3];
                String carMaker = data[4];
                String carModel = data[5];
                String vin = data[6];
                //String manufacturedDate = data[7];
                LocalDate date = LocalDate.now();
                System.out.println(date);

                // Calculate the age of the vehicle
               // int age = calculateAge(manufacturedDate);

                // Create and add the vehicle to the list

                vehicleDtoList.add(VehicleDto.builder()
                        *//*.id(id)
                        .firstName(firstName)
                        .lastName(lastName)
                        .carMake(carMaker)
                        .carModel(carModel)
                        .vin(vin)
                        //.manufacturedDate(manufacturedDate)*//*
                        .build());

                // Process chunk after reaching the defined chunk size
                if (vehicleDtoList.size() >= chunkSize) {
                    //saveVehiclesToDatabase(vehicles);
                    //System.out.println(vehicleDtoList);
                    vehicleDtoList.clear();  // Clear the list to process the next chunk
                }
            }

            // Save remaining vehicles
            if (!vehicleDtoList.isEmpty()) {
                //saveVehiclesToDatabase(vehicles);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
*/
    private int calculateAge(Date manufacturedDate) {
        Date today = new Date();
        long timeDiff = today.getTime() - manufacturedDate.getTime();
        return (int) (timeDiff / (1000L * 60 * 60 * 24 * 365));  // Convert time difference to years
    }

}
