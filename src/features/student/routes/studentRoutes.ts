import express, { Router } from 'express';
import { StudentController } from '@student/controllers/studentController';
import { studentMiddleware } from '@helpers/middlewares/student-middleware';

class StudentRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/addStudent', StudentController.prototype.add_student);
    this.router.get('/getStudents', studentMiddleware.verifyStudent, StudentController.prototype.get_student);
    this.router.put('/updateStudent', StudentController.prototype.update_student);
    this.router.delete('/deleteStudent', StudentController.prototype.delete_student);

    return this.router;
  }
}

export const studentRoutes: StudentRoutes = new StudentRoutes();
