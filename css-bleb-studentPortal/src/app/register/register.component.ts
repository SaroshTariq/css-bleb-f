import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { VandV } from '../VandV';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { ToastGeneratorService } from '../toast-generator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isChanged = false;
  project_id = 0;
  displayImg1;
  displayImg2;
  displayImg3;
  project = {photo1: 'photos/projects/dummy_fyp.jpg', 
    photo2: 'photos/projects/dummy_fyp.jpg', 
    photo3: 'photos/projects/dummy_fyp.jpg', 
    project_id: '', 
    title: '', 
    category_id : '',
    overview: '',
    registration_id: ''};
    
  student = {email : '',
            registration_id : ''};
  categories = [];
  students = [];
  projects = [];
  newStudents = [];
  
  constructor(private _service : DataService, private vav:VandV, private router: Router, private _tgs: ToastGeneratorService) { }

  ngOnInit() {
    this.inItData();
  }

  inItData(){
    this._service.projects.subscribe(res => {
      this.projects = res.json();
      this.displayImg1 = 'http://localhost:3000/'+this.project.photo1;
      this.displayImg2 = 'http://localhost:3000/'+this.project.photo2;
      this.displayImg3 = 'http://localhost:3000/'+this.project.photo3;
      
      this.project.project_id = this.getMaxID();
      this.newStudents.push({registration_id: '', email: '', project_id: this.project.project_id});

      this._service.categories.subscribe(res => {
        this.categories = res.json();
        this.project.category_id = this.categories[0].category_id;
      });
      
    });

    this._service.students.subscribe(res => {
      this.students = res.json();
    });
  }
  
  onPhoto1Selected(event){
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.displayImg1 = event.target.result;  
      
    }
    reader.readAsDataURL(event.target.files[0]);
    this.project.photo1 = event.target.files[0];
    this.isChanged = true;
  }

  onPhoto2Selected(event){
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.displayImg2 = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
    this.project.photo2 = event.target.files[0];
    this.isChanged = true;
  }

  onPhoto3Selected(event){
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.displayImg3 = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
    this.project.photo3 = event.target.files[0];
    this.isChanged = true;
  }

  errorsProject(fieldName, propName){
    return this.vav.validate(fieldName, this.project[propName], propName, this.projects);
  }

  errorsStudent(fieldName, propName, i){
    return this.vav.validate(fieldName, this.newStudents[i][propName], propName, this.students);
  }

  allValid(){
    var keyNames = Object.keys(this.project);
    for(let key of keyNames){
      if(this.errorsProject("None", key).length!=0){
        return false;
      }
    }
    for(var i=0; i<this.newStudents.length; i++){
      var keyNames = Object.keys(this.newStudents[i]);
      for(let key of keyNames){
        if(this.errorsStudent("None", key, i).length!=0){
          return false;
        }
      }
    }
    return true;
  }
  
  register(){
    this._service.addProject(this.project).subscribe(res => {
      for(let student of this.newStudents){
        this._service.addStudent(student).subscribe();
      }
      this._tgs.showToast(200);
      this.router.navigate(['congrats']);
    });
  }

  getMaxID() {
    if(this.projects.length!=0){
      return this.projects.reduce((max, p) => p.project_id > max ? p.project_id : max, this.projects[0].project_id)+1
    }
    return 9001;
  }
    
  
  onAdMoreClick(){
    this.newStudents.push({registration_id: '', email: '', project_id: this.project.project_id});
  }  

  onRemoveClick(registration_id){
    this.newStudents.splice(this.newStudents.filter(e =>  e.registration_id==registration_id)[0], 1);
  }
}
