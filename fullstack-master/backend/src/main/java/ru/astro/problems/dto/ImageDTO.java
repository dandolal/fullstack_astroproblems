package ru.astro.problems.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
public class ImageDTO {
    @Getter
    @Setter
    String name;

    @Getter
    @Setter
    String type;

    @Getter
    @Setter
    byte[] data;

    @Getter
    @Setter
    private String description;

    @Getter
    @Setter
    Long problemId;
}
