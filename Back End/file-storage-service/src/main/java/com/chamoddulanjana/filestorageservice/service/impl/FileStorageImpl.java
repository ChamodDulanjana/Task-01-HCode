package com.chamoddulanjana.filestorageservice.service.impl;

import com.chamoddulanjana.filestorageservice.service.FileStorageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileStorageImpl implements FileStorageService {
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
    }
}
