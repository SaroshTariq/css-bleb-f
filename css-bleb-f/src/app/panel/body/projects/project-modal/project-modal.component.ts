import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../services/data.service';
import { VandV } from '../../../../VandV';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent implements OnInit {

  @Output() action = new EventEmitter<any>();

  newProject = false;
  isChanged = false;
  project_id;
  project = {photo1: 'photos/projects/dummy_fyp.jpg', 
    photo2: 'photos/projects/dummy_fyp.jpg', 
    photo3: 'photos/projects/dummy_fyp.jpg', 
    project_id: '', 
    title: '', 
    category_id : '', 
    beacon_id: '', 
    overview: '',
    status: 'unverified',
    registration_id: ''};
  projects = [];
  displayImg1; 
  displayImg2; 
  displayImg3;

  categories = [];
  beacons = [];
  projectStudents = [];
  students = [];

  constructor(public modalRef: BsModalRef, private _service: DataService, private vav: VandV) {}
  
  ngOnInit(){
    this.initData();
  }
  initData(){
    this._service.projects.subscribe(res => {
      this.projects = res.json();
      this.projects.splice(0, 1);
      if(this.project_id==9000){
        this.newProject = true;
        this.project.project_id = this.getMaxID();
      }else{
        this.project = this.projects.filter(e => e.project_id===this.project_id)[0];
        var i = this.projects.indexOf(this.projects.filter(e => e.project_id === this.project_id)[0]);
        this.projects.splice(i, 1);
      }
      this.project_id =  this.project.project_id;
      this.displayImg1 = 'http://localhost:3000/'+this.project.photo1;
      this.displayImg2 = 'http://localhost:3000/'+this.project.photo2;
      this.displayImg3 = 'http://localhost:3000/'+this.project.photo3;
      this.refreshStudents();

      this._service.categories.subscribe(res => {
        this.categories = res.json();
        if(this.newProject){
          this.project.category_id = this.categories[0].category_id;
        }
      });
  
      this._service.beacons.subscribe(res => {
        this.beacons = res.json();
        if(this.newProject){
          this.project.beacon_id = this.beacons[0].beacon_id;
          
          
        }
      });
      
    });
    

  }

  refreshStudents(){
    this._service.students.subscribe(res => {
      this.students = res.json();
      this.projectStudents = this.students.filter(s => s.project_id==this.project_id);
      this.students = this.students.filter(s => s.project_id!=this.project_id);
    });
  }

  save(){
    if(this.newProject){
      this._service.addProject({photo1: this.project.photo1, 
        photo2: this.project.photo2, 
        photo3: this.project.photo3,  
        title: this.project.title, 
        category_id : this.project.category_id, 
        beacon_id: this.project.beacon_id, 
        overview: this.project.overview,
        project_id: this.project.project_id,
        status: this.project.status,
        registration_id:this.project.registration_id}).subscribe(res => {
          this.modalRef.hide();
          this.action.emit('saved');
        });
    }else{
      this._service.updateProject(this.project.project_id, 
        {photo1: this.project.photo1, 
         photo2: this.project.photo2, 
         photo3: this.project.photo3,  
         title: this.project.title, 
         category_id : this.project.category_id, 
         beacon_id: this.project.beacon_id, 
         overview: this.project.overview,
         status: this.project.status,
         registration_id:this.project.registration_id}).subscribe( res => { 
          this.modalRef.hide();
          this.action.emit('saved');
      });
    }    
  }
 
  cancel(){
    this.modalRef.hide();
    this.action.emit('canceled');
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
  



  errors(name, propName){
    if(this.project[propName]!=null){
      return this.vav.validate(name, this.project[propName], propName, this.projects);
    }
    return [];
  }


  removeStudent(student_id){
    this._service.updateStudent(student_id, {project_id: 9000}).subscribe(res => {
      this.isChanged = true;
      this.refreshStudents();
    });
  }

  addStudentToProject(student_id){
    this._service.updateStudent(student_id, {project_id: this.project_id}).subscribe(res => {
      this.isChanged = true;
      this.refreshStudents();

    });
  }


  getMaxID() {
    if(this.projects.length!=0){
      return this.projects.reduce((max, p) => p.project_id > max ? p.project_id : max, this.projects[0].project_id)+1;
    }
    return 9001;
  }


  allValid(){
    var keyNames = Object.keys(this.project);
    for(let key of keyNames){
      if(this.errors("None", key).length!=0){
        return false;
      }
    }
    return true;
  }


}
