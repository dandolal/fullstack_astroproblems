package ru.astro.problems.entity;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.annotation.ReadOnlyProperty;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "problems")
public class Problem {
    @Getter
    @ReadOnlyProperty
    @Id
    @GeneratedValue
    @Column(name = "problem_id")
    private Long id;

    @Getter
    @Setter
    private String title;

    @Getter
    @Setter
    @NonNull
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
    @ReadOnlyProperty
    @ManyToMany
    @JoinTable(
            name = "problems_themes",
            joinColumns = @JoinColumn(name = "problem_id"),
            inverseJoinColumns = @JoinColumn(name = "theme_name")
    )
    private final Set<Theme> themes = new HashSet<>();

    @Getter
    @ReadOnlyProperty
    @OneToMany(mappedBy = "problem")
    private final Set<Image> images = new HashSet<>();
}
