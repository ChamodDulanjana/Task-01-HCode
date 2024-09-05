package com.chamoddulanjana.fileuploadservice.controller;

import com.chamoddulanjana.fileuploadservice.service.CsvQueueService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/v1/fileUpload")
@CrossOrigin
@RequiredArgsConstructor
public class FileUploadController {

    private final CsvQueueService csvQueueService;

    @GetMapping("/health")
    public String healthCheck(){
        return "OK";
    }

    @PostMapping
    public void getCsvFile(@RequestParam("file") MultipartFile file){
        csvQueueService.uploadCsvToQueue(file);

    }

}

