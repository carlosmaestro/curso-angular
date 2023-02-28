import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;
  categorias: { value: any, display: string }[];

  constructor(
    private formbuilder: FormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location
  ) {
    this.categorias = [
      { display: 'Front-End', value: 'front-end' },
      { display: 'Back-End', value: 'back-end' },
    ];
    this.form = this.formbuilder.group({
      name: [null],
      category: [null],
    });
  }

  ngOnInit(): void {
  }

  onCancel() {
    this,this.location.back();
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: (result) => this.onSuccess(),
      error: (error) => this.onError()
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
