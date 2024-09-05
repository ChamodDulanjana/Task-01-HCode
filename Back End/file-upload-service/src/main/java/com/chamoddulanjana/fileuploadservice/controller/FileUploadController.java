package com.chamoddulanjana.fileuploadservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/fileUpload")
public class FileUploadController {

    @GetMapping("/health")
    public String healthCheck(){
        return "OK";
    }
}
