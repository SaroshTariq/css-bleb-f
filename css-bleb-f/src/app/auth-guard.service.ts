import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '../../node_modules/@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _authservice: AuthenticationService, public router: Router) { }
  
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
