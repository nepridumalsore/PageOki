package com.example.userservice.controller;

import com.example.userservice.dto.*;
import com.example.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http .ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    @Autowired private final UserService userService;

    // Получить свой профиль (авторизованный пользователь)
    @GetMapping("/me")
    public UserResponse getCurrentUser(Authentication authentication) {
        return UserResponseMapper.fromDto(userService.getCurrentUser(authentication));
    }

    // Получить пользователя по ID (например, для админа)
    @GetMapping("/{id}")
    public UserResponse getUserById(@PathVariable Long id) {
        return UserResponseMapper.fromDto(userService.getUserById(id));
    }

    // Обновить профиль
    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateCurrentUser(
            Authentication authentication,
            @RequestBody UpdateUserRequest request
    ) {
        UserDto dto = userService.updateCurrentUser(authentication, request);
        UserResponse response = UserResponseMapper.fromDto(dto);
        return ResponseEntity.ok(response);
    }

    // Удалить пользователя
    @PreAuthorize("hasAnyRole('MODERATOR','ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build(); //TODO - replace noContent
    }

    // Изменение роли (только для админ)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/role")
    public ResponseEntity<?> updateUserRole(
            @PathVariable Long id,
            @RequestBody UpdateRoleRequest request
    ) {
        userService.changeUserRole(id, request.getRole());
        return ResponseEntity.ok().build();
    }
}