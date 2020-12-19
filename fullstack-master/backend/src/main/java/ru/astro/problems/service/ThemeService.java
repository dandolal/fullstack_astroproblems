package ru.astro.problems.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.astro.problems.dto.ThemeDTO;
import ru.astro.problems.entity.Problem;
import ru.astro.problems.entity.Theme;
import ru.astro.problems.repository.ThemeRepository;

import java.util.Optional;

@Service
public class ThemeService {
    @Autowired
    ThemeRepository themeRepository;

    ModelMapper modelMapper = new ModelMapper();

    public ThemeDTO convertToDto(Theme theme) {
        ThemeDTO themeDTO = modelMapper.map(theme, ThemeDTO.class);
        theme.getProblems().forEach(problemEntity -> themeDTO.getProblemIdSet().add(problemEntity.getId()));
        return themeDTO;
    }

    @Transactional
    public Optional<Theme> getTheme(String themeName) {
        return themeRepository.getByName(themeName);
    }

    @Transactional
    public Theme saveTheme(ThemeDTO themeDTO) {
        return getTheme(themeDTO.getName())
                .orElse(themeRepository.save(modelMapper.map(themeDTO, Theme.class)));
    }

    @Transactional
    public Problem assignThemeToProblem(Theme theme, Problem problem) {
        problem.getThemes().add(theme);
        return problem;
    }

    @Transactional
    public Problem removeThemeFromProblem(Theme theme, Problem problem) {
        problem.getThemes().remove(theme);
        return problem;
    }
}
