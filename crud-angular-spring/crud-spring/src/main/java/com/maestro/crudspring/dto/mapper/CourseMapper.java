package com.maestro.crudspring.dto.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.maestro.crudspring.dto.CourseDTO;
import com.maestro.crudspring.dto.LessonDTO;
import com.maestro.crudspring.enums.Category;
import com.maestro.crudspring.model.Course;

@Component
public class CourseMapper {
    public CourseDTO toDTO(Course course) {
        if (course == null) {
            return null;
        }

        List<LessonDTO> lessons = course.getLessons()
        .stream()
        .map(l-> new LessonDTO(l.getId(), l.getName(), l.getYoutubeUrl()))
        .toList();
        return new CourseDTO(
            course.getId(), 
            course.getName(), 
            course.getCategory().getValue(),
            lessons
            );
    }

    public Course toEntity(CourseDTO courseDTO) {
        if (courseDTO == null) {
            return null;
        }
        Course course = new Course();
        if (courseDTO.id() != null) {
            course.setId(courseDTO.id());
        }
        course.setName(courseDTO.name());
        course.setCategory(convertCategoryValue(courseDTO.category()));
        return course;
    }

    public Category convertCategoryValue(String value) {
        if (value == null) {
            return null;
        }
        return switch (value) {
            case "Front-end" -> Category.FRONTEND;
            case "Back-end" -> Category.BACKEND;
            default -> throw new IllegalArgumentException("Categoria inválida: " + value);
        };
    }
}
