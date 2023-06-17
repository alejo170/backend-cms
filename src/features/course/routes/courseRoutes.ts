import express, { Router } from 'express';
import { CourseController } from '@course/controllers/courseController';
import { studentMiddleware } from '@helpers/middlewares/student-middleware';
import { courseMiddleware } from '@helpers/middlewares/course-middleware';

class CourseRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/addCourse', studentMiddleware.verifyStudent, CourseController.prototype.add_course);
    this.router.get('/getCourses', courseMiddleware.verifyCourse, CourseController.prototype.get_course);
    this.router.put('/updateCourse', CourseController.prototype.update_course);
    this.router.delete('/deleteCourse', CourseController.prototype.delete_course);

    return this.router;
  }
}

export const courseRoutes: CourseRoutes = new CourseRoutes();
