package ru.astro.problems.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ProblemDTO {
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private String title;

    @Getter
    @Setter
    private String statement;

    @Getter
    @Setter
    private String solution;

    @Getter
    @Setter
    private String answer;

    @Getter
    @Setter
    private String username;

    @Getter
    @Setter
    private String author;

    @Getter
    @Setter
    private Set<String> themes = new HashSet<>();

    @Getter
    @Setter
    private Set<String> images = new HashSet<>();
}
