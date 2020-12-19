package ru.astro.problems;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import ru.astro.problems.controller.APIController;
import ru.astro.problems.dto.UserDTO;
import ru.astro.problems.entity.Problem;
import ru.astro.problems.entity.User;
import ru.astro.problems.service.ProblemService;
import ru.astro.problems.service.UserService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


import static org.assertj.core.internal.bytebuddy.matcher.ElementMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = APIController.class)
public class ServiceTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserService userService;

    @MockBean
    private ProblemService problemService;

    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();

    @Test
    public void ProblemAll() throws Exception {
        Problem problem = new Problem();
        problem.setTitle("title");


        ArrayList<Problem> problems = new ArrayList<Problem>();
        problems.add(problem);

        given(problemService.getAll()).willReturn(problems);

        MvcResult result = mvc.perform(get("/api/problems")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1))).andReturn();


        assertEquals(result.getResponse().getContentAsString(), ow.writeValueAsString(problem));

    }

    @Test
    public void SaveProblem() throws Exception {
        Problem problem = new Problem();

        problem.setTitle("title");
        problem.setStatement("task");

        given(problemService.saveProblem(problem)).willReturn(problem);

        mvc.perform(post("/api/problem")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ow.writeValueAsString(problem)))
                .andExpect(status().isOk());
    }

    @Test
    public void SaveUser() throws Exception {
        UserDTO user = new UserDTO();
        user.setUsername("admin");
        user.setPassword("admin");

        given(userService.saveUser(user)).willReturn(true);

        mvc.perform(post("/api/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ow.writeValueAsString(user)))
                .andExpect(status().isOk());
    }

    @Test
    public void LoginUser() throws Exception {
        UserDTO user = new UserDTO();
        user.setUsername("admin");
        user.setPassword("admin");

        given(userService.checkUser(user)).willReturn(1);

        mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ow.writeValueAsString(user)))
                .andExpect(status().isOk());
    }


}
