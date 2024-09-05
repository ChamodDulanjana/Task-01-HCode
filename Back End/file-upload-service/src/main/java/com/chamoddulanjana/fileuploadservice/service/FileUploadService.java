package com.chamoddulanjana.fileuploadservice.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {
    void uploadCsvFile(MultipartFile file);
}
