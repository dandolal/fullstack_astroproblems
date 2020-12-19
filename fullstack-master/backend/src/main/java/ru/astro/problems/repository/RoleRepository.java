package ru.astro.problems.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.astro.problems.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
