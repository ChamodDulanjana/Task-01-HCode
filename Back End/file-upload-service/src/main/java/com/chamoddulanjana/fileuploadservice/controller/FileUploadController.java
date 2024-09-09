package com.chamoddulanjana.fileuploadservice.controller;

import com.chamoddulanjana.fileuploadservice.service.CsvQueueService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Controller
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
        csvQueueService.storeFileIntoStorage(file);
    }

}

