package com.maestro.crudspring;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.maestro.crudspring.enums.Category;
import com.maestro.crudspring.model.Course;
import com.maestro.crudspring.model.Lesson;
import com.maestro.crudspring.repository.CourseRepository;

@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabalse(CourseRepository courseRepository){
		return args -> {
			courseRepository.deleteAll();

			Course c = new Course();

			c.setName("Angular com Spring");
			c.setCategory(Category.FRONTEND);

			Lesson l = new Lesson();
			l.setName("Introdução");
			l.setYoutubeUrl("watch?v=1");
			l.setCourse(c);
			List<Lesson> lessons = c.getLessons();
			lessons.add(l);

			Lesson l1 = new Lesson();
			l1.setName("Angular");
			l1.setYoutubeUrl("watch?v=1");
			l1.setCourse(c);
			
			lessons.add(l1);

			c.setLessons(lessons);

			courseRepository.save(c);
		};
	}
}
