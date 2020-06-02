import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, AlertComponent } from 'ngx-bootstrap';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import { DataService } from '../../../services/data.service';
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';
import { ToastGeneratorService } from '../../../../toast-generator.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  categories = [];
  beacons = [];
  checkedCategories = [];
  checkedBeacons = [];
  checkedProjects = [];
  projects = [];

  projectModalRef: BsModalRef;
  searchString = '';
  searchBy = 'title';
  constructor(private _service: DataService, private modalService: BsModalService, private _tgs: ToastGeneratorService) { }

  ngOnInit() {
    this.initData();
  }

  initData(){
    this.checkedProjects = [];  
    this._service.projects.subscribe(res => {
      this.projects = res.json();
      this.projects.splice(0, 1);
    });
    this._service.categories.subscribe(res => {
      this.categories = res.json();
    });

    this._service.beacons.subscribe(res => {
      this.beacons = res.json();
    });
    
    
  }

  openProjectModal(project_id){
    let config = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered modal-lg  scroll-wrap',
      initialState: {
        project_id
      }
    }
    this.projectModalRef = this.modalService.show(ProjectModalComponent,  config);
    this.projectModalRef.content.action.subscribe(res => {
      if(res=='saved'){
        this.initData();
        this._tgs.showToast(200);
      }
    });
  }

  onCategoryCheckBoxChange(category,event){
    if(event.target.checked) {
      this.checkedCategories.push(category.category_id);
    }else{
      var i = this.checkedCategories.indexOf(this.checkedCategories.filter(e => e.category_id === category.category_id)[0]);
      this.checkedCategories.splice(i, 1);
    }
  }

  onBeaconCheckBoxChange(beacon,event){
    if(event.target.checked) {
      this.checkedBeacons.push(beacon.beacon_id);
    }else{
      var i = this.checkedBeacons.indexOf(this.checkedBeacons.filter(e => e.beacon_id === beacon.beacon_id)[0]);
      this.checkedBeacons.splice(i, 1);
    }
  }

  onProjectCheckBoxChange(project_id,event){
    if(event.target.checked) {
      this.checkedProjects.push(project_id);
    }else{
      var i = this.checkedProjects.indexOf(this.checkedProjects.filter(e => e === project_id)[0]);
      this.checkedProjects.splice(i, 1);
    }
  }

  onDeleteClicked(){
    var message = '';
    for(let el of this.checkedProjects){
      if(this.projects.filter(e => e.project_id==el)[0].students>0){
        message = message+
                  '<p>Project <span class="text-danger">'+this.projects.filter(e => e.project_id==el)[0].registration_id+'</span> has <span class="text-danger">'+this.projects.filter(e => e.project_id==el)[0].students+'</span> students.</p>';
      }
    }
    message = message+'<p>Students associated to the projects will also be deleted. Are you sure you want to delete? </p>';
    let config = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered  scroll-wrap',
      initialState: {
       message: message
      }
    }
    var cofirmationModalRef = this.modalService.show(ConfirmationModalComponent,  config);
    cofirmationModalRef.content.action.subscribe(res => {
      if(res=='yes'){
        this.deleteSelectedProjects();
        this._tgs.showToast(200);
      }
    });
  }
  deleteSelectedProjects(){
    this._service.deleteProjects(this.checkedProjects).subscribe(res => {
      this.initData();
    });
  }
}
