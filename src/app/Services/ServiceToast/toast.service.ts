import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }
  
  showSuccess(text:any,title: any) {
    this.toastr.success(text,title);
  }

  showError(text:any,title: any) {
    this.toastr.error(text, title, {
      timeOut: 3000
    });
  }

  showWarning(text:any,title: any) {
    this.toastr.warning(text,title);
  }

  showInfo(text:any) {
    this.toastr.info(text);
  }

}
