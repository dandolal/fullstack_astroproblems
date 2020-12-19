package ru.astro.problems.entity;


import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.springframework.data.annotation.ReadOnlyProperty;

import javax.persistence.*;

@Entity
@Table(name = "images")
public class Image {

    @Getter
    @ReadOnlyProperty
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(updatable = false, nullable = false)
    private String name;

    @Getter
    @Setter
    private String type;

    @Getter
    @Setter
    @NonNull
    @Lob
    @Type(type = "org.hibernate.type.BinaryType")
    private byte[] data;

    @Getter
    @Setter
    private String description;

    @Getter
    @Setter
    @ManyToOne(optional = false)
    @JoinColumn(name = "problem_id", nullable = false, foreignKey = @ForeignKey(name = "problem_of_image"))
    private Problem problem;
}
