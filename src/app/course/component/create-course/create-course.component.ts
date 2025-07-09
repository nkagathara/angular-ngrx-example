import { Course } from './../../model/course.model';
import { createCourse } from './../../store/course.actions';
import { AppState } from './../../../store/reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as uuid from 'uuid';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html'
})
export class CreateCourseComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  onSubmit(submittedForm: NgForm) {
    if (submittedForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(submittedForm.controls).forEach(key => {
        submittedForm.controls[key].markAsTouched();
      });
      return;
    }

    const course: Course = {
      id: uuid.v4(), 
      name: submittedForm.value.name.trim(), 
      description: submittedForm.value.description.trim()
    };
    
    this.store.dispatch(createCourse({course}));
    
    // Reset form after successful submission
    submittedForm.resetForm();
  }
}