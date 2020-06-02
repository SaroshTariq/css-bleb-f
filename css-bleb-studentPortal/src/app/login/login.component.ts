import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service.service';
import { ToastGeneratorService } from '../toast-generator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  student = {email : '', password: ''};
  authString = null;
  constructor(private _authservice: AuthenticationServiceService, private router: Router, private _tgs: ToastGeneratorService) { }

  ngOnInit() {
    
  }

  login(){
    this._authservice.authenticateLogin(this.student).subscribe(res => {
      this._authservice.login(res.json());
      this._tgs.showToast(202);
      this.router.navigate(['panel']);
    },
    err => {
      this._tgs.showToast(406);
    });
  }

}
