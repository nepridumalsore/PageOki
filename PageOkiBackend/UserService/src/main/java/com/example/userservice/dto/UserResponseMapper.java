package com.example.userservice.dto;

public class UserResponseMapper {
    public static UserResponse fromDto(UserDto dto) {
        UserResponse response = new UserResponse();
        response.setId(dto.getId());
        response.setEmail(dto.getEmail());
        response.setUsername(dto.getUsername());
        return response;
    }
}
