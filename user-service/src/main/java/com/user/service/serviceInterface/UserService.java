package com.user.service.serviceInterface;



import com.user.entity.User;

import java.util.List;

public interface UserService {

    User createUser(User user);

    User getUserById(Integer userId);

    List<User> getAllUsers();

    void deleteUser(Integer userId);

}
