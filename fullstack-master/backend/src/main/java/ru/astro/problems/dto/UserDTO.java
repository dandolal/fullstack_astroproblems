package ru.astro.problems.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDTO {
    @Getter
    @Setter
    private String username;

    @Getter
    @Setter
    private String password;
}
