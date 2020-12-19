package ru.astro.problems.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.astro.problems.dto.UserDTO;
import ru.astro.problems.entity.User;
import ru.astro.problems.service.UserService;

import java.security.Principal;
import java.util.Optional;

//@RestController
//public class LoginController {
//    @Autowired
//    UserService userService;
//
//    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(11);
//
//    @RequestMapping(value = "/login", method = RequestMethod.POST)
//    public Principal login(Principal user) {
//        System.out.println("login() called");
//        return user;
//    }
//}
