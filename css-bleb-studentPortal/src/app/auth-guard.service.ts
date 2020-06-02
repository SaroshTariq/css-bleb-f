import { Injectable } from '@angular/core';
import { AuthenticationServiceService } from './authentication-service.service';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _authservice: AuthenticationServiceService, public router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._authservice.isLoggedIn().toPromise().then(result => {
      if(result.json().message==='auth'){
        return true;
      }else{
        this.router.navigate(['/']);
      }
    })
  }
}