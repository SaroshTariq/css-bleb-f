import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { StudentModalComponent } from '../student-modal/student-modal.component';
import { DataService } from '../../../services/data.service';
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';
import { ToastGeneratorService } from '../../../../toast-generator.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  checkedStudents = [];

  students = [];
  searchString = '';
  searchBy = 'first_name';

  studentModalRef: BsModalRef;
  constructor(private _service: DataService, private modalService: BsModalService, private _tgs: ToastGeneratorService) { }

  ngOnInit() {
    this.initData();
  }

  initData(){
    this.checkedStudents = [];  
    this._service.students.subscribe(res => {
      this.students = res.json();
    });
  }

  openStudentModal(student_id){
    let config = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered modal-lg  scroll-wrap',
      initialState: {
        student_id
      }
    }
    this.studentModalRef = this.modalService.show(StudentModalComponent,  config);
    this.studentModalRef.content.action.subscribe(res => {
      if(res=='saved'){
        this.initData();
        this._tgs.showToast(200);
      }
    });
  }

  onStudentCheckBoxChange(student_id,event){
    if(event.target.checked) {
      this.checkedStudents.push(student_id);
    }else{
      var i = this.checkedStudents.indexOf(this.checkedStudents.filter(e => e === student_id)[0]);
      this.checkedStudents.splice(i, 1);
    }
  }
  onDeleteClicked(){
    let config = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered  scroll-wrap',
      initialState: {
       message: 'Are you sure you want to delete? '
      }
    }
    var cofirmationModalRef = this.modalService.show(ConfirmationModalComponent,  config);
    cofirmationModalRef.content.action.subscribe(res => {
      if(res=='yes'){
        this.deleteSelectedStudents();
        this._tgs.showToast(200);
      }
    });
  }

  deleteSelectedStudents(){
    this._service.deleteStudents(this.checkedStudents).subscribe(res => {
      this.initData();
    });
  }

}
