import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../services/data.service';
import { DatePipe } from '@angular/common';
import { VandV } from '../../../../VandV';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
  styleUrls: ['./student-modal.component.css']
})
export class StudentModalComponent implements OnInit {
  @Output() action = new EventEmitter<any>();

  student_id = 0;
  newStudent = false;
  isChanged = false
  student = {student_id: 0,
    display_picture: 'photos/students/dummy_student.png',
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    date_of_birth: new Date(),
    postal_address: '',
    overview: '',
    project_id: null,
    registration_id: ''};

  students = [];
  projects = [];

  displayPicture = '';
  constructor(public modalRef: BsModalRef, private httpClient: HttpClient, private _service: DataService, private datePipe: DatePipe, private vav: VandV) {}

  ngOnInit(){
    this.setUpData();
  }

  setUpData(){
    this._service.students.subscribe(res => {
      this.students = res.json();
      this.student.date_of_birth = new Date(this.student.date_of_birth);
      if(this.student_id==8000){
        this.newStudent = true;
        this.student.student_id = this.getMaxID();
      }else{
        this.student = this.students.filter(e => e.student_id===this.student_id)[0];
        var i = this.students.indexOf(this.students.filter(e => e.student_id === this.student_id)[0]);
        this.students.splice(i, 1); 
      }
      this._service.projects.subscribe(res => {
        this.projects = res.json();
        if(this.newStudent){
          this.student.project_id = this.projects[0].project_id;
        }
      });
      this.student_id = this.student.student_id;
      this.displayPicture = environment.API_HOST+this.student.display_picture;
    });
  }

  save(){
    if(this.newStudent){
      this._service.addStudent({student_id: this.student.student_id,
        display_picture: this.student.display_picture,
        first_name: this.student.first_name,
        last_name: this.student.last_name,
        email: this.student.email,
        mobile: this.student.mobile,
        date_of_birth: this.datePipe.transform(this.student.date_of_birth,"yyyy-MM-dd"),
        postal_address: this.student.postal_address,
        overview: this.student.overview,
        project_id: this.student.project_id,
        registration_id: this.student.registration_id}).subscribe(res => {
          this.modalRef.hide();
          this.action.emit('saved');
        });
    }else{
      this._service.updateStudent(this.student.student_id, {display_picture: this.student.display_picture,
        first_name: this.student.first_name,
        last_name: this.student.last_name,
        email: this.student.email,
        mobile: this.student.mobile,
        date_of_birth: this.datePipe.transform(this.student.date_of_birth,"yyyy-MM-dd"),
        postal_address: this.student.postal_address,
        overview: this.student.overview,
        project_id: this.student.project_id,
        registration_id: this.student.registration_id}).subscribe( res => { 
          this.modalRef.hide();
          this.action.emit('saved');
      });
    }    
  }
 
  cancel(){
    this.modalRef.hide();
    this.action.emit('canceled');
  }


  onDisplayPictureSelected(event){
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.displayPicture = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
    this.student.display_picture = event.target.files[0];
    this.isChanged = true;
  }


  errors(name, propName){
    if(this.student[propName]!=null){
      return this.vav.validate(name, this.student[propName], propName, this.students);
    }
    return [];
  }

  getMaxID() {
    if(this.students.length!=0){
      return this.students.reduce((max, p) => p.student_id > max ? p.student_id : max, this.students[0].student_id)+1;
    }
    return 8001;
  }


  allValid(){
    var keyNames = Object.keys(this.student);
    for(let key of keyNames){
      if(this.errors("None", key).length!=0 && key!='project_id'){
        return false;
      }
    }
    return true;
  }
}
