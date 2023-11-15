import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  @Input()
  courses: Course[] = [];

  @Output()
  add = new EventEmitter(false);

  @Output()
  edit = new EventEmitter<Course>();

  @Output()
  remove = new EventEmitter<Course>();

  readonly displayedColumns: string[] = ['name', 'category', 'actions'];

  constructor() { }

  ngOnInit(): void { }

  onAdd() {
    this.add.emit();
  }

  onEdit(course:Course){
    this.edit.emit(course);
  }

  onRemove(course:Course){
    this.remove.emit(course);
  }
}
