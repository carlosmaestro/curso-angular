import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form = this.formbuilder.group({
    _id: [''],
    name: [''],
    category: [''],
  });

  categorias: { value: any; display: string }[];

  constructor(
    private formbuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.categorias = [
      { display: 'Front-End', value: 'front-end' },
      { display: 'Back-End', value: 'back-end' },
    ];
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    const { _id, name, category } = course;
    this.form.setValue({
      _id,
      name,
      category,
    });
  }

  onCancel() {
    this, this.location.back();
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: (result) => this.onSuccess(),
      error: (error) => this.onError(),
    });
  }

  onError() {
    this._snackBar.open('Erro ao salvar curso', '', { duration: 5000 });
  }
  onSuccess() {
    this.onCancel();
    this._snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
  }
}
