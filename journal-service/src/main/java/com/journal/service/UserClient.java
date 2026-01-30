package com.journal.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UserClient {

    private final RestTemplate restTemplate;

    public UserClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public boolean userExists(Integer userId) {
        try {
            restTemplate.getForObject(
                    "http://USER-SERVICE/api/users/" + userId,
                    Object.class);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
