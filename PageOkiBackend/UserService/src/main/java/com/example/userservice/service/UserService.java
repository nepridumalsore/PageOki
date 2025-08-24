package com.example.userservice.service;

import com.example.userservice.dto.UpdateUserRequest;
import com.example.userservice.dto.UserDto;
import com.example.userservice.enums.Role;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface UserService {
    UserDto getCurrentUser(Authentication authentication);
    UserDto getUserById(Long id);
    List<UserDto> getAllUsers();
    UserDto updateCurrentUser(Authentication authentication, UpdateUserRequest request);
    void deleteUser(Long id);
    void changeUserRole(Long userId, Role newRole);
}

