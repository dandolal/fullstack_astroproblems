package ru.astro.problems.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import ru.astro.problems.entity.User;
import ru.astro.problems.service.UserService;

import java.util.Optional;

@Component
public class UserAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    UserService userService;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(11);

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        System.out.println("UserAuthenticationProvider.authenticate() called");

        Object credentials = authentication.getCredentials();
        if (!(credentials instanceof String)) {
            return null;
        }
        String rawPassword = credentials.toString();
        String username = authentication.getName();
        Optional<User> userOptional = userService.getUser(username);
        if (!userOptional.isPresent()) {
            System.out.println("Authentication failed for " + username);
            throw new BadCredentialsException("Authentication failed for " + username + ". No exists such user.");
        } else if (!encoder.matches(rawPassword, userOptional.get().getPassword()))  {
            System.out.println("Authentication failed for " + username + ". Invalid password");
            throw new BadCredentialsException("Authentication failed for " + username);
        }
        return new UsernamePasswordAuthenticationToken(username, rawPassword, userOptional.get().getRoles());
    }

    @Override
    public boolean supports(Class<?> authentication) {

        System.out.println("UserAuthenticationProvider.supports() called");

        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
