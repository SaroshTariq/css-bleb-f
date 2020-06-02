import { Injectable } from '@angular/core'; 
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastGeneratorService {
  constructor(private toastr: ToastrService) { }

  showToast(request: number){
    
    switch(request){
      case 202: { 
        this.toastr.success('Logged in.', 'Success', { timeOut: 2000, positionClass: 'toast-bottom-left'});
        break; 
     } 
     case 200:
        this.toastr.success('Operation succeded.', 'Success', { timeOut: 2000, positionClass: 'toast-bottom-left'});
        break;
     case 406: { 
        this.toastr.error('Incorrect email or password.', 'Fail', { timeOut: 5000, positionClass: 'toast-bottom-left'});
        break; 
     } 
     case 401: { 
      this.toastr.error('Unauthrized', 'Fail', { timeOut: 5000, positionClass: 'toast-bottom-left'});
      break; 
     }
     default: { 
        //statements; 
        break; 
     } 
    }
  }
}
