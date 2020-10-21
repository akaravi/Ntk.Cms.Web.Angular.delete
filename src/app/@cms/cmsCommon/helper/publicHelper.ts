import { Injectable } from "@angular/core";
import { ErrorExcptionResultBase } from "app/@cms/cmsModels/base/errorExcptionResult";
import { toArray } from "rxjs/operators";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "environments/environment";
import { CmsAuthService } from "app/@cms/cmsService/core/auth.service";
import { TokenInfoModel } from "app/@cms/cmsModels/base/tokenInfoModel";
import { CmsToastrServiceService } from 'app/@cms/cmsService/_base/cmsToastrService.service';
import { RecordStatus } from 'app/@cms/cmsModels/Enums/recordStatus.enum';

@Injectable({
  providedIn: "root",
})
export class PublicHelper {
  //TokenInfo: TokenInfoModel;
  constructor(
    private router: Router,
    private toastrService: CmsToastrServiceService,
    //cmsAuthService: CmsAuthService
  ) {
    // cmsAuthService.CorrectTokenInfoBSObs.subscribe((vlaue) => {
    //   this.TokenInfo = vlaue;
    // });
  }

  CheckError(model: any) {
    if (!model) {
      return "Error";
    }
    let errorExcptionResult: ErrorExcptionResultBase;
    if (model["error"]) {
      errorExcptionResult = model["error"];
      if (errorExcptionResult) {
        if (errorExcptionResult.Status == 401) {
          this.toastrService.toastr.warning(
            "لطفا مجددا وارد حساب کاربری خود شوید",
            "نیاز به ورود مجدد"
          );
          this.router.navigate([environment.cmsUiConfig.Pathlogin]);
          return;
        }
      }
    }

    if (model.errors) {
      let ret = "";

      var aaa = model.errors.keys;

      return ret;
    } else if (model && model.ErrorMessage) {
      return model.ErrorMessage;
    }
    return "Error";
  }

  LocaleDate(model) {
    const d = new Date(model);
    return d.toLocaleDateString("fa-Ir");
  }

  Truncate(value: string,limit:number=20 ,trail:string="...") {
     
    
    return value.length > limit ? value.substring(0, limit) + trail : value; 
   }
  RecordStatus(model) {

    //let _RecordStatus : RecordStatus = RecordStatus[model];

    var str: string = RecordStatus[model];

    return str;
  }
}
