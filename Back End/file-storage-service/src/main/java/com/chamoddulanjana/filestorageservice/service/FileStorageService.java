package com.chamoddulanjana.filestorageservice.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    void storeFileIntoStorage(MultipartFile file);
}
