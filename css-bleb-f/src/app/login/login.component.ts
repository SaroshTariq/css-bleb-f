import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '../../../node_modules/@angular/router';
import 'rxjs/add/operator/catch';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { ToastGeneratorService } from '../toast-generator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  admin = {email : '', password: ''};
  authString = null;
  constructor(private _authservice: AuthenticationService, private router: Router, private _tgs: ToastGeneratorService) { }

  ngOnInit() {
    
  }

  login(){
    this._authservice.authenticateLogin(this.admin).subscribe(res => {
      this._tgs.showToast(202);
      this._authservice.login(res.json());
      this.router.navigate(['panel']);
    },
    err => {
      this._tgs.showToast(406);
    });
  }
}
