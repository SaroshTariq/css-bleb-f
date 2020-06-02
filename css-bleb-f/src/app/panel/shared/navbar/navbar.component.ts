import { Component, OnInit, HostListener } from '@angular/core';
import { AuthenticationService } from '../../../authentication.service';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastGeneratorService } from '../../../toast-generator.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _authservice: AuthenticationService, public router: Router, private _service: DataService) { }
  admin = {};
  ngOnInit() {
    this._service.getAdminByEmail(localStorage.getItem('email')).subscribe(res => {
      this.admin = res.json()[0];
    });
    this._service.accountUpdated.subscribe(res => {
      if(res=='saved'){
        this._service.getAdminByEmail(localStorage.getItem('email')).subscribe(res => {
          this.admin = res.json()[0];
        });
      }
    });
  }

  logout(){
    this._authservice.logout().subscribe(res => {
      this.router.navigate(['/']);
      localStorage.setItem('token', '123');
      localStorage.setItem('email', '123');
    });
  }


}
