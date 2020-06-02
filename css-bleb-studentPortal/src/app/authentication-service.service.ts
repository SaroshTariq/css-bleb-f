import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  login(res){
    localStorage.setItem('token', res.token);
    localStorage.setItem('student_id', res.student_id);
    localStorage.setItem('project_id', res.project_id);
  }

  logout(){
    return this.http.delete("http://localhost:3000/admins/logout/"+localStorage.getItem('token'));
  }

  updateEmail(email){
    localStorage.setItem('email', email);
  }

  authenticateLogin(admin){
    localStorage.setItem('email', admin.email);
    return this.http.post("http://localhost:3000/students/login/"+admin.email, {password: admin.password});
  }


  isLoggedIn(){
    return this.http.get("http://localhost:3000/admins/authenticate/"+localStorage.getItem('token'));
  }


  
  constructor(private http: Http) { }
}
