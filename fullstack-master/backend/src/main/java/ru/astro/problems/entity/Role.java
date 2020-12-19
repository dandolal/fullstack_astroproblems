package ru.astro.problems.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
public class Role implements GrantedAuthority {
    @Getter
    @Setter
    @Id
    @Column(name = "role_name", nullable = false, unique = true)
    private String name;

    @Getter
    @ReadOnlyProperty
    @ManyToMany(mappedBy = "roles")
    private final Set<User> users = new HashSet<>();

    @Override
    public String getAuthority() {
        return getName();
    }
}
