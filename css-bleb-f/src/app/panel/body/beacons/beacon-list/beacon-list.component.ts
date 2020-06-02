import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BeaconModalComponent } from '../beacon-modal/beacon-modal.component';
import { DataService } from '../../../services/data.service';
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';
import { ToastGeneratorService } from '../../../../toast-generator.service';

@Component({
  selector: 'app-beacon-list',
  templateUrl: './beacon-list.component.html',
  styleUrls: ['./beacon-list.component.css']
})
export class BeaconListComponent implements OnInit {
  beacons = [];
  projects = [];
  checkedProjects = [];
  searchString = '';
  checkedBeacons = [];
  searchBy = 'location';
  beaconModalRef : BsModalRef;
  constructor(private _service : DataService, private modalService: BsModalService, private _tgs: ToastGeneratorService) { 
  }

  ngOnInit() {
    this.initData();
    this._service.projects.subscribe(res => {
      this.projects = res.json();
    });
  }

  initData(){
    this.checkedBeacons = [];  
    this._service.beacons.subscribe(res => {
      this.beacons = res.json();
    });
  }

  openBeaconModal(beacon_id){
    let config = {
      backdrop : true,
      ignoreBackdropClick : true,
      class: 'modal-dialog-centered modal-lg  scroll-wrap',
      initialState : {
        beacon_id
      }
    }
    this.beaconModalRef = this.modalService.show(BeaconModalComponent, config);
    this.beaconModalRef.content.action.subscribe(res => {
      if(res=='saved'){
        this.initData();
        this._tgs.showToast(200);
      }
    });
  }

  onDeleteClicked(){
    var message = "";
    message = message + '<p>Are you sure you want to delete?</p>';
    let config = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered  scroll-wrap',
      initialState: {
       message: message
      }
    }
    var confirmationModalRef = this.modalService.show(ConfirmationModalComponent, config);
    confirmationModalRef.content.action.subscribe(res => {
      if(res == 'yes'){
        this.deleteSelectedBeacons();
      }
    });
  }

  deleteSelectedBeacons(){
    this._service.deleteBeacons(this.checkedBeacons).subscribe(res => {
      this.initData();
    })
  }

  onBeaconCheckedBoxChange(beacon_id, event){
    if(event.target.checked){
      this.checkedBeacons.push(beacon_id);
    }
    else{
      var i = this.checkedBeacons.indexOf(this.checkedBeacons.filter(e => e.beacon_id == beacon_id)[0]);
      this.checkedBeacons.splice(i, 1);
    }
  }

}
