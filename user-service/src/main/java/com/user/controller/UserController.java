package com.user.controller;


import com.user.dto.UserResponseDTO;
import com.user.entity.User;
import com.user.mapper.UserMapper;
import com.user.model.UserModel;
import com.user.service.serviceInterface.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserService userService,
                          UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    // CREATE USER
//    @PostMapping
//    public ResponseEntity<UserResponseDTO> createUser(
//            @RequestBody @Valid UserRequestDTO dto) {
//
//        User user = new User();
//        user.setEmail(dto.getEmail());
//        user.setPassword(dto.getPassword());
//
//        User savedUser = userService.createUser(user);
//
//        UserModel model = userMapper.toModel(savedUser);
//
//        UserResponseDTO response =
//                new UserResponseDTO(model.getUserId(), model.getEmail());
//
//        return new ResponseEntity<>(response, HttpStatus.CREATED);
//    }

    // GET USER BY ID
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable Integer id) {

        User user = userService.getUserById(id);

        UserModel model = userMapper.toModel(user);

        UserResponseDTO response =
                new UserResponseDTO(model.getUserId(), model.getEmail());

        return ResponseEntity.ok(response);
    }

    // GET ALL USERS
//    @GetMapping
//    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
//
//        List<UserResponseDTO> users =
//                userService.getAllUsers()
//                        .stream()
//                        .map(userMapper::toModel)
//                        .map(m -> new UserResponseDTO(m.getUserId(), m.getEmail()))
//                        .toList();
//
//        return ResponseEntity.ok(users);
//    }

    // DELETE USER
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {

        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
