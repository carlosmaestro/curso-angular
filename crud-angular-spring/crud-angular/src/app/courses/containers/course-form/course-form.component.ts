import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
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
    name: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],
    category: ['', Validators.required],
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
    if(this.form.invalid){
      return;
    }
    this.service.save(this.form.value).subscribe({
      next: (result) => this.onSuccess(),
      error: (error) => this.onError(),
    });
  }

  private onError() {
    this._snackBar.open('Erro ao salvar curso', '', { duration: 5000 });
  }
  private onSuccess() {
    this.onCancel();
    this._snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('minlength')) {
      const requiredlength = field.errors? field.errors['minlength']['requiredLength']: 5;
      return `Tamanho mínimo precisa ser de ${requiredlength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requiredlength = field.errors? field.errors['maxlength']['requiredLength']: 200;
      return `Tamanho máximo precisa ser de ${requiredlength} caracteres`;
    }

    return 'Campo inválido';
  }
}
