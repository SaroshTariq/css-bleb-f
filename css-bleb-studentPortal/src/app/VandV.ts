import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VandV {
  validate(name, input, propName, dataArray){
    // ('Email', 'sarosh@gmail.com', 'email', [{student_id: '1001', email: 'sarosh@gmail.com'}])
    var errors = [];

    errors = errors.concat(this.validationErrors(name, input, propName));
    if(errors.length!=0){
      return errors;
    }

    if (dataArray.some(e => e[propName] === input &&(propName === 'title' || propName === 'email' || propName === 'mobile' || propName === 'registration_id'))) {
        errors.push(name+" is taken.");
    }
    return errors;
  }

  validationErrors(name, input, propName){
    var errors = [];    
    var isNumber = false;
    if(propName=='mobile'){
      isNumber = !isNaN(input);
      console.log(isNumber);
    }
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(input.length==0 && propName!='email' && propName!='mobile'){
        errors.push(name+" is required!!");
    }else if((propName=='email' && !emailRegex.test(String(input).toLowerCase()))){        
      errors.push(name+" is invalid!!");
    }else if(propName=='mobile' && isNumber==false){
      errors.push(name+" is invalid!!");
    }
    
    return errors;
  }
  constructor() { }
}
