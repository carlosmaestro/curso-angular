package com.maestro.crudspring.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.maestro.crudspring.dto.CourseDTO;
import com.maestro.crudspring.dto.mapper.CourseMapper;
import com.maestro.crudspring.exception.RecordNotFoundException;
import com.maestro.crudspring.repository.CourseRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CourseService {
  private final CourseRepository courseRepository;
  private CourseMapper courseMapper;

  public CourseService(CourseRepository courseRepository, CourseMapper courseMapper) {
    this.courseRepository = courseRepository;
    this.courseMapper = courseMapper;
  }

  public List<CourseDTO> list() {
    return courseRepository.findAll()
        .stream()
        .map(courseMapper::toDTO)
        .toList();
  }

  public CourseDTO findById(@NotNull @Positive Long id) {
    return courseRepository.findById(id).map(courseMapper::toDTO).orElseThrow(() -> new RecordNotFoundException(id));
  }

  public CourseDTO create(@Valid @NotNull CourseDTO course) {
    return courseMapper.toDTO(courseRepository.save(courseMapper.toEntity(course)));
  }

  public CourseDTO update(@NotNull @Positive Long id, @Valid @NotNull CourseDTO course) {
    return courseRepository.findById(id)
        .map(recordFound -> {
          recordFound.setName(course.name());
          recordFound.setCategory(courseMapper.convertCategoryValue(course.category()));
          return courseMapper.toDTO(courseRepository.save(recordFound));
        }).orElseThrow(() -> new RecordNotFoundException(id));
  }

  public void delete(@NotNull @Positive Long id) {
    courseRepository.delete(courseRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id)));
  }
}
