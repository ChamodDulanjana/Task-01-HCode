package com.chamoddulanjana.fileuploadservice.service;

import org.springframework.web.multipart.MultipartFile;

public interface CsvQueueService {
    void uploadCsvToQueue(MultipartFile file);
}
