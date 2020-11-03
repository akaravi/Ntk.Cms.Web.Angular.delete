import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { CmsToastrService } from 'app/@cms/cmsService/base/cmsToastr.service';
import { EnumRecordStatus, ErrorExcptionResultBase } from 'ntk-cms-api';

@Injectable({
  providedIn: 'root',
})
export class PublicHelper {
  // TokenInfo: TokenInfoModel;
  constructor(
    private router: Router,
    private toastrService: CmsToastrService,
    // cmsAuthService: CmsAuthService
  ) {
    // cmsAuthService.CorrectTokenInfoBSObs.subscribe((vlaue) => {
    //   this.TokenInfo = vlaue;
    // });
  }

  CheckError(model: any) {
    if (!model) {
      return 'Error';
    }
    let errorExcptionResult: ErrorExcptionResultBase;
    if (model['error']) {
      errorExcptionResult = model['error'];
      if (errorExcptionResult) {
        if (errorExcptionResult.Status === 401) {
          this.toastrService.toastr.warning(
            'لطفا مجددا وارد حساب کاربری خود شوید',
            'نیاز به ورود مجدد'
          );
          this.router.navigate([environment.cmsUiConfig.Pathlogin]);
          return;
        }
      }
    }

    if (model.errors) {
      const ret = '';

      const aaa = model.errors.keys;

      return ret;
    } else if (model && model.ErrorMessage) {
      return model.ErrorMessage;
    }
    return 'Error';
  }

  LocaleDate(model) {
    const d = new Date(model);
    return d.toLocaleDateString('fa-Ir');
  }

  Truncate(value: string, limit: number= 20 , trail: string= '...') {


    return value.length > limit ? value.substring(0, limit) + trail : value;
   }
  RecordStatus(model) {

    // let _RecordStatus : RecordStatus = RecordStatus[model];

    const str: string = EnumRecordStatus[model];

    return str;
  }
}
