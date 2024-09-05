package com.chamoddulanjana.filestorageservice.controller;

import com.chamoddulanjana.filestorageservice.service.FileStorageService;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class FileStorageController {

    private final FileStorageService fileStorageService;

    @GetMapping("/health")
    public String healthCheck(){
        return "OK";
    }

    @PostMapping
    public void storeFile(@RequestParam("file") MultipartFile file){
        fileStorageService.storeFileIntoStorage(file);
    }
}
