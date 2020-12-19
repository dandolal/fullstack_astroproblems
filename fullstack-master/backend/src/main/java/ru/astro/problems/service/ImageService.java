package ru.astro.problems.service;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import ru.astro.problems.dto.ImageDTO;
import ru.astro.problems.entity.Image;
import ru.astro.problems.entity.Problem;
import ru.astro.problems.repository.ImageRepository;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Optional;

@Service
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ProblemService problemService;

    private final ModelMapper modelMapper = new ModelMapper();

    public ImageDTO convertToDto(Image image) {
        ImageDTO imageDTO = modelMapper.map(image, ImageDTO.class);
        imageDTO.setProblemId(image.getProblem().getId());
        return imageDTO;
    }

    @Transactional
    public Image saveImage(ImageDTO imageDTO, MultipartFile file) {
        Problem problem = problemService.getProblem(imageDTO.getProblemId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Problem not found"));
        Image image = getImage(imageDTO.getName()).orElse(new Image());
        image.setType(file.getContentType());
        image.setProblem(problem);
        try {
            image.setData(file.getBytes());
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "It is not possible to read file");
        }
        return saveImage(image);
    }

    @Transactional
    public Image saveImage(Image image) {
        return imageRepository.save(image);
    }

    @Transactional
    public Optional<Image> getImage(String imageName) {
        return imageRepository.getByName(imageName);
    }

    @Transactional
    public void deleteImage(ImageDTO imageDTO) {
        imageRepository.getByName(imageDTO.getName())
                .ifPresent(imageEntity -> imageRepository.delete(imageEntity));
    }
}
