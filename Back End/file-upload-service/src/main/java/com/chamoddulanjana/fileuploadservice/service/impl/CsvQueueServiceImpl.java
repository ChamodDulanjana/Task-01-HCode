package com.chamoddulanjana.fileuploadservice.service.impl;

import com.chamoddulanjana.fileuploadservice.service.CsvQueueService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import redis.clients.jedis.Jedis;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class CsvQueueServiceImpl implements CsvQueueService {

    private final JedisConnectionFactory jedisConnectionFactory;
    private static final String REDIS_QUEUE = "csvQueue";

    @Override
    public void uploadCsvToQueue(MultipartFile file) {
        try (Jedis jedis = new Jedis(jedisConnectionFactory.getHostName(), jedisConnectionFactory.getPort());
             BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {

            String line;
            while ((line = reader.readLine()) != null) {
                // Push each row into Redis queue
                jedis.lpush(REDIS_QUEUE, line);
                System.out.println(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
