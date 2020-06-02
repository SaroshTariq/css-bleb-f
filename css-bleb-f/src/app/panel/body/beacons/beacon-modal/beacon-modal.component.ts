import { Component, OnInit, EventEmitter } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { BsModalRef } from 'ngx-bootstrap';
import { VandV } from '../../../../VandV';

@Component({
  selector: 'app-beacon-modal',
  templateUrl: './beacon-modal.component.html',
  styleUrls: ['./beacon-modal.component.css']
})
export class BeaconModalComponent implements OnInit {
  action = new EventEmitter<any>();

  beacon_id = '';
  beacon = {beacon_id: '',location: '', uuid: '', major_id: '', minor_id: '', status:'unactive'};
  beacons = [];
  newBeacon = false;
  isChanged = false;
  constructor(private _service : DataService,public modalRef: BsModalRef, private vnv : VandV) {}

  ngOnInit() {
    this.initData();
  }

  initData(){
    this._service.beacons.subscribe(res => {
      this.beacons = res.json();
      
      if(this.beacon_id.toString()==='2000'){
        this.newBeacon = true;
        this.beacon = {beacon_id: this.getMaxID(),location: '', uuid: '', major_id: '', minor_id: '', status:'unactive'}; 
      }
      else{
        this.beacon = this.beacons.filter(e => e.beacon_id == this.beacon_id)[0];   
        var i = this.beacons.indexOf(this.beacon);
        this.beacons.splice(i, 1); 
      }      
    });
  }

  getMaxID() {
    if(this.beacons.length!=0){
      return this.beacons.reduce((max, p) => p.beacon_id > max ? p.beacon_id : max, this.beacons[0].beacon_id)+1;
    }
    return 2001;
  }

  save(){
    if(this.newBeacon){
      this._service.addBeacon({beacon_id : this.beacon.beacon_id, location : this.beacon.location, uuid : this.beacon.uuid, major_id : this.beacon.major_id, minor_id : this.beacon.minor_id, status:this.beacon.status}).subscribe(res => {
        this.modalRef.hide();
        this.action.emit('saved');
      });
    }else{
      this._service.updateBeacon(this.beacon.beacon_id, {location: this.beacon.location, uuid:this.beacon.uuid, major_id:this.beacon.major_id, minor_id:this.beacon.minor_id, status:this.beacon.status}).subscribe(res => {
        this.modalRef.hide();
        this.action.emit('saved');
      });  
    }
  }

  cancel(){
    this.modalRef.hide();
    this.action.emit('canceled');
  }

  errors(name, propName){
    if(this.beacon[propName]!=null){
      return this.vnv.validate(name, this.beacon[propName], propName, this.beacons);
    }
  }

  allValid(){
    var keyNames = Object.keys(this.beacon);
    for(let key of keyNames){
      if(this.errors("None", key).length!=0){
        return false;
      }
    }
    return true;
  }
}
