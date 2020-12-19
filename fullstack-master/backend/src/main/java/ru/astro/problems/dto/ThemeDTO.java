package ru.astro.problems.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

public class ThemeDTO {
    @Getter
    @Setter
    String name;

    @Getter
    @Setter
    Set<Long> problemIdSet = new HashSet<>();
}
