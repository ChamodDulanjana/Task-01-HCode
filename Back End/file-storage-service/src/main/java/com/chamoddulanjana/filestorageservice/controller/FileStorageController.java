package com.chamoddulanjana.filestorageservice.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("api/v1/fileStorage")
@CrossOrigin
public class FileStorageController {

    @GetMapping("/health")
    public String healthCheck(){
        return "OK";
    }

    @PostMapping
    public void storeFile(@RequestParam("file") MultipartFile file){
        if (file.isEmpty()) {
            System.out.println("File is empty!");
            return;
        }

        // Process and print the CSV file
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);  // Print each line to the console
            }
        } catch (Exception e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }
}
