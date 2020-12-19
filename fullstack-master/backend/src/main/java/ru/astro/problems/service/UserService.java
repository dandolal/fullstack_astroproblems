package ru.astro.problems.service;

import com.fasterxml.jackson.annotation.JacksonInject;
import org.hibernate.service.spi.InjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.astro.problems.dto.UserDTO;
import ru.astro.problems.entity.Role;
import ru.astro.problems.entity.User;
import ru.astro.problems.repository.RoleRepository;
import ru.astro.problems.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(11);

    @Override
    public UserDetails loadUserByUsername(String username) {
        Optional<User> optionalUser = userRepository.getByUsername(username);
        if (!optionalUser.isPresent()) {
            throw new UsernameNotFoundException(username);
        }
        return optionalUser.get();
    }

    @Transactional
    public boolean saveUser(UserDTO userDTO) {
        if (userRepository.getByUsername(userDTO.getUsername()).isPresent()) {
            return false;
        }

//        Role role = new Role();
//        role.setName("ROLE_USER");
//        role = roleRepository.save(role);

        User user = new User();
//        user.getRoles().add(role);
        user.setUsername(userDTO.getUsername());
        user.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
        userRepository.save(user);
        return true;
    }

    @Transactional
    public int checkUser(UserDTO userDTO) {
        if (!userRepository.getByUsername(userDTO.getUsername()).isPresent()) {
            return 1;
        }
        if (!bCryptPasswordEncoder.matches(userDTO.getPassword(), userRepository.getByUsername(userDTO.getUsername()).get().getPassword())) {
            return 2;
        }
        return 0;

    }

    @Transactional
    public Optional<User> getUser(UserDTO userDTO) {
        return getUser(userDTO.getUsername());
    }

    @Transactional
    public Optional<User> getUser(String username) {
        return userRepository.getByUsername(username);
    }

}
