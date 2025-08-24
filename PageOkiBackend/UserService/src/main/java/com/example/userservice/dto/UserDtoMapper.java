package com.example.userservice.dto;

import com.example.userservice.entity.User;

public class UserDtoMapper {
    public static UserDto fromUser(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setUsername(user.getUsername());
        dto.setRole(user.getRole());
        return dto;
    }

    public static UserDto fromResponse(UserResponse response) {
        UserDto dto = new UserDto();
        dto.setId(response.getId());
        dto.setEmail(response.getEmail());
        dto.setUsername(response.getUsername());
        return dto;
    }
}
