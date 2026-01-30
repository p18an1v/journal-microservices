package com.user.mapper;

import com.user.entity.User;
import com.user.model.UserModel;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

//    // Entity -> Model (for responses)
//    public static UserModel toModel(User user) {
//        return new UserModel(
//                user.getUserId(),
//                user.getEmail()
//        );
//    }
//
//    // Model -> Entity (if ever needed)
//    public static User toEntity(UserModel model) {
//        User user = new User();
//        user.setUserId(model.getUserId());
//        user.setEmail(model.getEmail());
//        return user;
//    }

    public UserModel toModel(User user) {
        return new UserModel(
                user.getUserId(),
                user.getEmail()
        );
    }

    public User toEntity(UserModel model) {
        User user = new User();
        user.setUserId(model.getUserId());
        user.setEmail(model.getEmail());
        return user;
    }
}
