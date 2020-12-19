package ru.astro.problems.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.astro.problems.entity.Problem;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Long> {
    Optional<Problem> getById(Long id);

    @Query(value = "select * from problems", nativeQuery = true)
    ArrayList<Problem> getAll();
}
