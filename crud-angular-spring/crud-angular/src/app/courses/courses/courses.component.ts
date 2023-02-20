import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';

import { Course } from './../model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses: Course[];

  displayedColumns: string[];

  constructor(private coursesService: CoursesService) {
    this.courses = this.coursesService.list();
    this.displayedColumns = ['name', 'category'];
  }

  ngOnInit(): void {
  }

}
