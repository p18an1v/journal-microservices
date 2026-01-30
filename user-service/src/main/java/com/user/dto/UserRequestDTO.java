package com.user.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserRequestDTO {

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
