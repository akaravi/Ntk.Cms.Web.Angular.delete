import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CmsToastrService {
  constructor(public toastr: ToastrService) {}

  // Success Type
  typeSuccessAdd() {
    this.toastr.success('با موفقیت اضافه شد', 'Success!');
  }
  typeSuccessRemove() {
    this.toastr.success('با موفقیت حذف شد', 'Success!');
  }
  typeSuccessEdit() {
    this.toastr.success('با موفقیت ویرایش شد', 'Success!');
  }
  typeSuccessMove() {
    this.toastr.success('با موفقیت منتقل شد', 'Success!');
  }

  // error Type
  typeErrorAdd(message: string = '') {
    let _message = 'خطا در اضافه کردن';
    if (message && message.length > 0) {
      _message = _message + ' error: ' + message;
    }
    this.toastr.error(_message, 'Error!');
  }
  typeErrorRemove(message: string = '') {
    let _message = 'خطا در حذف کردن';
    if (message && message.length > 0) {
      _message = _message + ' error: ' + message;
    }
    this.toastr.error(_message, 'Error!');
  }
  typeErrorEdit(message: string = '') {
    let _message = 'خطا در ویرایش کردن';
    if (message && message.length > 0) {
      _message = _message + ' error: ' + message;
    }
    this.toastr.error(_message, 'Error!');
  }
  typeErrorMove(message: string = '') {
    let _message = 'خطا در جابجا کردن';
    if (message && message.length > 0) {
      _message = _message + ' error: ' + message;
    }
    this.toastr.error(_message, 'Error!');
  }
}
