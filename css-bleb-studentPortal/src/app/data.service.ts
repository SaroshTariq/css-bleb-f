import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  projects = this.http.get("http://localhost:3000/"+"projects");
  students = this.http.get("http://localhost:3000/"+"students");
  categories = this.http.get("http://localhost:3000/"+"categories");

  addProject(project){
    var formData = new FormData();
    for(var key in project){
      formData.append(key, project[key]);
    }
    return this.http.post(environment.API_HOST+"projects", formData);
  }

  addStudent(student){
    var formData = new FormData();
    for(var key in student){
      formData.append(key, student[key]);
    }
    return this.http.post(environment.API_HOST+"students", formData);
  }

  updateProject(project_id, project){
    var formData = new FormData();
    for(var key in project){
      formData.append(key, project[key]);
    }
    return this.http.put(environment.API_HOST+"projects/"+project_id, formData);
  }

  updateStudent(student_id, student){
    var formData = new FormData();
    for(var key in student){
      formData.append(key, student[key]);
    }
    return this.http.put(environment.API_HOST+"students/"+student_id, formData);
  }

  constructor(private http: Http) { }
}