package com.chamoddulanjana.filestorageservice.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;

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

    }
}
