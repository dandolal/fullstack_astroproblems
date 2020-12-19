package ru.astro.problems.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.astro.problems.dto.ProblemDTO;
import ru.astro.problems.entity.Image;
import ru.astro.problems.entity.Problem;
import ru.astro.problems.entity.Theme;
import ru.astro.problems.repository.ProblemRepository;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProblemService {
    @Autowired
    private ProblemRepository problemRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private ThemeService themeService;

    private final ModelMapper modelMapper = new ModelMapper();

    public ProblemDTO convertToDto(Problem problem) {
        ProblemDTO problemDTO = modelMapper.map(problem, ProblemDTO.class);
        problemDTO.setThemes(problem.getThemes().stream().map(Theme::getName).collect(Collectors.toSet()));
        problemDTO.setImages(problem.getImages().stream().map(Image::getName).collect(Collectors.toSet()));
        return problemDTO;
    }

    @Transactional
    public Optional<Problem> getProblem(Long id) {
        return problemRepository.getById(id);
    }

    @Transactional
    public ArrayList<Problem> getAll() {
        return problemRepository.getAll();
    }

    @Transactional
    public Problem saveProblem(Problem problem, ProblemDTO problemDTO) {
        modelMapper.map(problemDTO, problem);
        return saveProblem(problem);
    }

    @Transactional
    public Problem saveProblem(Problem problem) {
        return problemRepository.save(problem);
    }


}
