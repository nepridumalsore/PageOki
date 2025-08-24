package com.example.userservice.dto;


import lombok.Data;

@Data
public class UpdateUserRequest {
    String username;
    String email;
}
