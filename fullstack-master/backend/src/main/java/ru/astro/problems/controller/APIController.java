package ru.astro.problems.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import ru.astro.problems.dto.ImageDTO;
import ru.astro.problems.dto.ProblemDTO;
import ru.astro.problems.dto.ThemeDTO;
import ru.astro.problems.dto.UserDTO;
import ru.astro.problems.entity.Problem;
import ru.astro.problems.entity.User;
import ru.astro.problems.repository.UserRepository;
import ru.astro.problems.service.ImageService;
import ru.astro.problems.service.ProblemService;
import ru.astro.problems.service.ThemeService;
import ru.astro.problems.service.UserService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
//import ru.astro.problems.service.UserService;

@CrossOrigin
@RequestMapping(value = "/api")
@RestController

public class APIController {
    @Autowired
    private ImageService imageService;

    @Autowired
    private ProblemService problemService;

    @Autowired
    private ThemeService themeService;

    @Autowired
    private UserService userService;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(11);

    private final ResponseStatusException notFountException =
            new ResponseStatusException(HttpStatus.NOT_FOUND, "Entity not found");

    @GetMapping("/index")
    public String index(String name) {
        return encoder.encode(name);
    }

    /**
     * Returns all problems form DB
     */
    @RequestMapping(value = "/problem/all", method = RequestMethod.GET)
    public List<ProblemDTO> getProblemAll() {
        return problemService.getAll().stream()
                .map(problem -> problemService.convertToDto(problem)).collect(Collectors.toList());
    }

    /**
     * Returns problem form DB if that exists else get throws exception
     */
    @RequestMapping(value = "/problem", method = RequestMethod.GET)
    public ProblemDTO getProblem(ProblemDTO problemDTO) {
        return problemService.convertToDto(problemService.getProblem(problemDTO.getId())
                .orElseThrow(() -> notFountException));
    }

    /**
     * Adds new problem or edits existing
     */
    @RequestMapping(value = "/problem", method = RequestMethod.POST)
    public ProblemDTO addProblem(@RequestBody ProblemDTO problemDTO) {
        return problemService.convertToDto(problemService.saveProblem(
                problemService.getProblem(problemDTO.getId()).orElse(new Problem()), problemDTO));
    }

    /**
     * Returns image from DB if that exists else throws exception
     */
    @RequestMapping(value = "/image", method = RequestMethod.GET)
    public ImageDTO getImage(ImageDTO imageDTO) {
        return imageService.convertToDto(imageService.getImage(imageDTO.getName())
                .orElseThrow(() -> notFountException));
    }

    /**
     * Adds new image or edits existing
     */
    @RequestMapping(value = "/image", method = RequestMethod.POST)
    public ImageDTO addImage(ImageDTO imageDTO, @RequestParam("file") MultipartFile file) {
        System.out.println("=)");
        return imageService.convertToDto(imageService.saveImage(imageDTO, file));
    }

    /**
     * Deletes image if that exists
     */
    @RequestMapping(value = "/image", method = RequestMethod.DELETE)
    public void deleteImage(ImageDTO imageDTO) {
        imageService.deleteImage(imageDTO);
    }

    /**
     * Returns theme if exists else throws 404 exception
     */
    @RequestMapping(value = "/theme", method = RequestMethod.GET)
    public ThemeDTO getTheme(ThemeDTO themeDTO) {
        return themeService.convertToDto(themeService.getTheme(themeDTO.getName())
                .orElseThrow(() -> notFountException));
    }

    /**
     * Adds theme if that exists
     */
    @RequestMapping(value = "/theme", method = RequestMethod.POST)
    public ThemeDTO deleteImage(ThemeDTO themeDTO) {
        return themeService.convertToDto(themeService.saveTheme(themeDTO));
    }

    /**
     * Add theme to problem if both exist else throws 404 exception
     */
    @RequestMapping(value = "/theme/assign", method = RequestMethod.POST)
    public ProblemDTO assignThemeToProblem(ThemeDTO themeDTO, ProblemDTO problemDTO) {
        return problemService.convertToDto(
                themeService.assignThemeToProblem(
                        themeService.getTheme(themeDTO.getName()).orElseThrow(() -> notFountException),
                        problemService.getProblem(problemDTO.getId()).orElseThrow(() -> notFountException)
                )
        );
    }

    /**
     * Removes theme from problem if both exist else throws 404 exception
     */
    @RequestMapping(value = "/theme/remove", method = RequestMethod.POST)
    public ProblemDTO removeThemeFromProblem(ThemeDTO themeDTO, ProblemDTO problemDTO) {
        return problemService.convertToDto(
                themeService.removeThemeFromProblem(
                        themeService.getTheme(themeDTO.getName()).orElseThrow(() -> notFountException),
                        problemService.getProblem(problemDTO.getId()).orElseThrow(() -> notFountException)
                )
        );
    }

    /**
     * Registers if USERNAME is available
     */
    @CrossOrigin
    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public boolean SignUp(@RequestBody UserDTO userDTO) {
        return userService.saveUser(userDTO);
    }


    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public int Login(UserDTO userDTO) {
        return userService.checkUser(userDTO);
    }
}
