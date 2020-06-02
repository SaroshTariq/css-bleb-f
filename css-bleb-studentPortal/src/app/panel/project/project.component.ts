import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { VandV } from '../../VandV';
import { ToastGeneratorService } from '../../toast-generator.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
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
    
  categories = [];
  projects = [];
  
  constructor(private _service : DataService, private vav:VandV, private _tgs: ToastGeneratorService, private toastr: ToastrService) { }

  ngOnInit() {
    this.inItData();
  }

  inItData(){
    
    this._service.projects.subscribe(res => {
      this.projects = res.json();
      this.project = this.projects.filter(e => e.project_id==localStorage.getItem('project_id'))[0];    
      var i = this.projects.indexOf(this.project);
      this.projects.splice(i, 1);
      this.displayImg1 = "http://localhost:3000/"+this.project.photo1;
      this.displayImg2 = "http://localhost:3000/"+this.project.photo2;
      this.displayImg3 = "http://localhost:3000/"+this.project.photo3;
      
      
      this._service.categories.subscribe(res => {
        this.categories = res.json();
      });
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

  errors(fieldName, propName){
    return this.vav.validate(fieldName, this.project[propName], propName, this.projects);
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
  
  save(){
    this._service.updateProject(this.project.project_id, {photo1: this.project.photo1, 
    photo2: this.project.photo1, 
    photo3: this.project.photo1, 
    title: this.project.title, 
    category_id : this.project.category_id,
    overview: this.project.overview,
    registration_id: this.project.registration_id}).subscribe(res => {
      this.isChanged = false;
      this._tgs.showToast(200);
    });
  }
}