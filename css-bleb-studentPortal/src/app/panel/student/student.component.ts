import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { DatePipe } from '@angular/common';
import { VandV } from '../../VandV';
import { ToastGeneratorService } from '../../toast-generator.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  isChanged = false
  student = {student_id: '',
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
  constructor(private _service: DataService, private datePipe: DatePipe, private vav: VandV, private _tgs: ToastGeneratorService) {}

  ngOnInit(){
    this.initData();
  }

  initData(){
    this._service.students.subscribe(res => {
      this.students = res.json();
      this.student = this.students.filter(e => e.student_id.toString()===localStorage.getItem('student_id'))[0];
      var i = this.students.indexOf(this.students.filter(e => e.student_id.toString()===localStorage.getItem('student_id'))[0]);
      this.students.splice(i, 1);    
      this.student.date_of_birth = new Date(this.student.date_of_birth);
      this.displayPicture = "http://localhost:3000/"+this.student.display_picture;
      
    }); 
  }

  save(){

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
        this.isChanged = false;
        this._tgs.showToast(200);
    });
     
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
