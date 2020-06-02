import { Injectable, EventEmitter } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  accountUpdated = new EventEmitter<any>();

  projects = this._clientService.getRequest('projects');
  students = this._clientService.getRequest('students');
  categories = this._clientService.getRequest('categories');
  beacons = this._clientService.getRequest('beacons');
  admins = this._clientService.getRequest('admins');

  updateProject(project_id, project){
    return this._clientService.putRequest('projects/'+project_id, project);
  }
  updateStudent(student_id, student){
    return this._clientService.putRequest('students/'+student_id, student);
  }
  updateBeacon(beacon_id, beacon){
    return this._clientService.putRequest('beacons/'+beacon_id, beacon);
  }
  updateCategory(category_id, category){
    return this._clientService.putRequest('categories/'+category_id, category);
  }
  updateAdmin(admin_id, admin){
    return this._clientService.putRequest('admin/'+admin_id, admin);
  }

  addProject(project){
    return this._clientService.postRequest('projects', project);
  }
  addStudent(student){
    return this._clientService.postRequest('students', student);
  }
  addBeacon(beacon){
    return this._clientService.postRequest('beacons', beacon);
  }
  addCategory(category){
    return this._clientService.postRequest('categories', category);
  }

  deleteProjects(project_ids){
    return this._clientService.deleteMultipleRequest('projects', project_ids);
  }
  deleteStudents(student_ids){
    return this._clientService.deleteMultipleRequest('students', student_ids);
  }
  deleteBeacons(beacon_ids){
    return this._clientService.deleteMultipleRequest('beacons', beacon_ids);
  }
  deleteCategories(category_ids){
    return this._clientService.deleteMultipleRequest('categories', category_ids);
  }


  getAdminByEmail(email){
    return this.http.get(environment.API_HOST+"admins/"+email);
  }

  constructor(private http: Http, private _clientService: ClientService) { }
}
