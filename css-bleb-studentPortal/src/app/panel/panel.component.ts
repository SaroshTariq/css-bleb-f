import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor(private _authservice: AuthenticationServiceService, public router: Router) { }

  ngOnInit() {
  }

  logout(){
    this._authservice.logout().subscribe(res => {
      this.router.navigate(['/login']);
      localStorage.setItem('token', '123');
      localStorage.setItem('email', '123');
      localStorage.setItem('project_id', '123');
      localStorage.setItem('student_id', '123');
    });
  }
}
