import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { VandV } from '../../../VandV';
import { AuthenticationService } from '../../../authentication.service';
import { DatePipe } from '../../../../../node_modules/@angular/common';
import { ToastGeneratorService } from '../../../toast-generator.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  securityCollapsed = true;

  passwordAuthString = null;
  basicsAuthString = null;

  oldPassword = '';
  newPassword = ''

  admin = {
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    date_of_birth: '',
    postal_address: '',
    newPassword: '',
    oldPassword: ''};
  admins = [];
  basicsIsChanged = false;
  securityIsChanged = false;
  constructor(private _service: DataService, private vav: VandV, private _authservice: AuthenticationService, private datePipe: DatePipe, private _tgs: ToastGeneratorService) { }

  ngOnInit() {
    this.initAdmin();
  }

  initAdmin(){
    this._service.admins.subscribe(res => {
      this.admins = res.json();
      this.admin = this.admins.filter(e => e.email===localStorage.getItem('email'))[0];
      this.admin.oldPassword = '';
      this.admin.newPassword = '';
      var i = this.admins.indexOf(this.admins.filter(e => e.email === this.admin.email)[0]);
      this.admins.splice(i, 1);
    });
  }

  save(info){
    if(info=='basics'){
      this._service.accountUpdated.emit('saved');
      this._service.updateAdmin(localStorage.getItem('email'), {
        first_name: this.admin.first_name,
        last_name: this.admin.last_name,
        email: this.admin.email,
        mobile: this.admin.mobile,
        date_of_birth: this.datePipe.transform(this.admin.date_of_birth,"yyyy-MM-dd"),
        postal_address: this.admin.postal_address}).subscribe(res => {
        this._authservice.updateEmail(this.admin.email);
        this.initAdmin();
        this.basicsIsChanged = false;
        this._tgs.showToast(200);
      });
    }else{
      this._authservice.updatePassword(this.admin).subscribe(res => {
        var result = res.json();
        if(result.message=='unauth'){
          this._tgs.showToast(401);
        }else{
          this._tgs.showToast(200);
        }
        this.basicsIsChanged==false;
      });
    }
  }

  basicsValid(){
    var keyNames = ['first_name', 'last_name', 'email', 'mobile', 'date_of_birth', 'postal_address'];
    for(let key of keyNames){
      if(this.errors("None", key).length!=0){
        return false;
      }
    }
    return true;
  }

  securityValid(){
    var keyNames = ['oldPassword', 'newPassword'];
    for(let key of keyNames){
      if(this.errors("None", key).length!=0){
        return false;
      }
    }
    return true;
  }

  errors(name, propName){
    if(this.admin[propName]!=null){
      return this.vav.validate(name, this.admin[propName], propName, this.admins);
    }
    return [];
  }

}
