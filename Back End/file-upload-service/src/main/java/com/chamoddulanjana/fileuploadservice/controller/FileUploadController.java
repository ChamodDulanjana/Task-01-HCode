package com.chamoddulanjana.fileuploadservice.controller;

import com.chamoddulanjana.fileuploadservice.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/v1/fileUpload")
@RequiredArgsConstructor
public class FileUploadController {

    private final FileUploadService fileUploadService;

    @GetMapping("/health")
    public String healthCheck(){
        return "OK";
    }

    @GetMapping
    public void getCsvFile(@RequestParam("file") MultipartFile file){
        fileUploadService.uploadCsvFile(file);
    }

}

