package com.example.userservice.service.Impl;

import com.example.userservice.dto.UserDto;
import com.example.userservice.dto.UserDtoMapper;
import com.example.userservice.entity.User;
import com.example.userservice.enums.Role;
import com.example.userservice.exception.DuplicateUserDataException;
import com.example.userservice.exception.UserNotFoundException;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserDto getCurrentUser(Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserDtoMapper.fromUser(user);
    }

    @Override
    public UserDto getUserById(Long id) {
        return userRepository.findById(id)
                .map(UserDtoMapper::fromUser)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserDtoMapper::fromUser)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto updateCurrentUser(Authentication authentication, UserDto userDto) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        // Проверка на уникальность username
        if (!user.getUsername().equals(userDto.getUsername())) {
            boolean usernameExists = userRepository.existsByUsername(userDto.getUsername());
            if (usernameExists) {
                throw new DuplicateUserDataException("Username already exists: " + userDto.getUsername());
            }
            user.setUsername(userDto.getUsername());
        }

        // Проверка на уникальность email
        if (!user.getEmail().equals(userDto.getEmail())) {
            boolean emailExists = userRepository.existsByEmail(userDto.getEmail());
            if (emailExists) {
                throw new DuplicateUserDataException("Email already exists: " + userDto.getEmail());
            }
            user.setEmail(userDto.getEmail());
        }

        User updatedUser = userRepository.save(user);
        return UserDtoMapper.fromUser(updatedUser);
    }

    @Override
    public UserDto updateUser(Long id, UserDto userDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        // Проверка на уникальность username
        if (!user.getUsername().equals(userDto.getUsername())) {
            boolean usernameExists = userRepository.existsByUsername(userDto.getUsername());
            if (usernameExists) {
                throw new DuplicateUserDataException("Username already exists: " + userDto.getUsername());
            }
            user.setUsername(userDto.getUsername());
        }

        // Проверка на уникальность email
        if (!user.getEmail().equals(userDto.getEmail())) {
            boolean emailExists = userRepository.existsByEmail(userDto.getEmail());
            if (emailExists) {
                throw new DuplicateUserDataException("Email already exists: " + userDto.getEmail());
            }
            user.setEmail(userDto.getEmail());
        }

        User updatedUser = userRepository.save(user);
        return UserDtoMapper.fromUser(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
    }

    @Override
    public void changeUserRole(Long userId, Role newRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
        user.setRole(newRole);
        userRepository.save(user);
    }
}
