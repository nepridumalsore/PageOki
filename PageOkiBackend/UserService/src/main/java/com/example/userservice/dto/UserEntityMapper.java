package com.example.userservice.dto;

import com.example.userservice.entity.User;

public class UserEntityMapper {
    public static User fromDto(UserDto dto) {
        User user = new User();
        user.setId(dto.getId());
        user.setEmail(dto.getEmail());
        user.setUsername(dto.getUsername());
        user.setRole(dto.getRole());
        return user;
    }
}
