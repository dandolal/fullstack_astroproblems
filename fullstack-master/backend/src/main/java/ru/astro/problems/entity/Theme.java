package ru.astro.problems.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "themes")
public class Theme {
    @Getter
    @Setter
    @Id
    @NonNull
    @Column(name = "theme_name")
    private String name;

    @Getter
    @ReadOnlyProperty
    @ManyToMany(mappedBy = "themes")
    private final Set<Problem> problems = new HashSet<>();
}
