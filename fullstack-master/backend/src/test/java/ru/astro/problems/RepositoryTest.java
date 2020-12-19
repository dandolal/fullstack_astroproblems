package ru.astro.problems;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import ru.astro.problems.entity.Problem;
import ru.astro.problems.repository.ProblemRepository;

import javax.swing.*;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNull;

@RunWith(SpringRunner.class)
@DataJpaTest
public class RepositoryTest {
    @Before
    public void setup() {
        Problem problem = new Problem();
        problem.setTitle("title");
        problem.setStatement("task");
        problem.setUsername("user");
        problem.setAnswer("5");
        testEntityManager.persist(problem);
        testEntityManager.flush();
    }

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private ProblemRepository problemRepository;

    @Test
    public void getById() throws Exception {
        Long num = new Long(2);
        Optional<Problem> problem = problemRepository.getById(num);
        assertNull(problem);

    }
}
