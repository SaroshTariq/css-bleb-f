import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  login(res){
    localStorage.setItem('token', res.token);
  }

  logout(){
    return this.http.delete(environment.API_HOST+"admins/logout/"+localStorage.getItem('token'));
  }

  updateEmail(email){
    localStorage.setItem('email', email);
  }

  authenticateLogin(admin){
    localStorage.setItem('email', admin.email);
    return this.http.post(environment.API_HOST+"admins/login/"+admin.email, {password: admin.password});
  }

  updatePassword(admin){
    var newAdmin = {password: admin.oldPassword, newPassword: admin.newPassword}
    return this.http.put(environment.API_HOST+"admins/updatePassword/"+admin.email, newAdmin);
  }

  isLoggedIn(){
    return this.http.get(environment.API_HOST+"admins/authenticate/"+localStorage.getItem('token'));
  }


  
  constructor(private http: Http) { }
}
