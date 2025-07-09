import { getAllCourses } from './../../store/course.selectors';
import { courseActionTypes } from './../../store/course.actions';
import { AppState } from './../../../store/reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from './../../model/course.model';
import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html'
})
export class CoursesListComponent implements OnInit {

  courses$: Observable<Course[]>;
  courseToBeUpdated: Course;
  isUpdateActivated = false;

  constructor(private courseService: CourseService, private store: Store<AppState>) { }

  ngOnInit() {
    this.courses$ = this.store.select(getAllCourses);
  }

  deleteCourse(courseId: string) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.store.dispatch(courseActionTypes.deleteCourse({courseId}));
    }
  }

  showUpdateForm(course: Course) {
    this.courseToBeUpdated = {...course};
    this.isUpdateActivated = true;
  }

  cancelUpdate() {
    this.isUpdateActivated = false;
    this.courseToBeUpdated = null;
  }

  updateCourse(updateForm: NgForm) {
    const update: Update<Course> = {
      id: this.courseToBeUpdated.id,
      changes: {
        ...this.courseToBeUpdated,
        ...updateForm.value
      }
    };

    this.store.dispatch(courseActionTypes.updateCourse({update}));
    this.isUpdateActivated = false;
    this.courseToBeUpdated = null;
  }

  trackByCourse(index: number, course: Course): string {
    return course.id;
  }
}