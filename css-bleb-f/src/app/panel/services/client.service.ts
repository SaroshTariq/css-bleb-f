import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  getRequest(route){
    return this.http.get(environment.API_HOST+route)
  }

  postRequest(route, object){
    if(route.includes('projects') || route.includes('students')){
      var formData = new FormData();
      for ( var key in object ) {
        formData.append(key, object[key]);
      }
      return this.http.post(environment.API_HOST+route, formData);
    }
    return this.http.post(environment.API_HOST+route, object);
  }

  putRequest(route: string, object){
    if(route.includes('projects') || route.includes('students')){
      var formData = new FormData();
      for ( var key in object ) {
        formData.append(key, object[key]);
      }
      return this.http.put(environment.API_HOST+route, formData);
    }
    return this.http.put(environment.API_HOST+route, object);
  }

  deleteMultipleRequest(route, ids){
    return this.http.delete(environment.API_HOST+route, new RequestOptions({
      body : ids
    }));
  }

  constructor(private http: Http) { }
}
