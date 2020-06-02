import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class VandV {
    validate(name, input, propName, dataArray){
        var errors = [];

        if(input.length==0){
            errors.push(name+" is required!!");
        }
        if(propName=='oldPassword' || propName=='newPassword'){
            return errors;
        }
        if (dataArray.some(e => e[propName] === input &&(propName === 'title' || propName === 'email' || propName === 'mobile' || propName === 'registration_id'))) {
            errors.push(name+" is taken.");
        }

        return errors;
    }
    constructor() { }
  }