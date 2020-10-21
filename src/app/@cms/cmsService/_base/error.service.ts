import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { CmsAuthService } from "../core/auth.service";
import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { ErrorExcptionResult } from "app/@cms/cmsModels/base/errorExcptionResult";
import { catchError, map, retry } from "rxjs/operators";
import { environment } from "environments/environment";
import { throwError } from "rxjs";
import { ApiServerBase } from './apiServerBase.service';

@Injectable({
  providedIn: "root",
})
export class ErrorService   extends ApiServerBase
implements OnDestroy {
  public baseUrl =environment. cmsServerConfig.configApiServerPath + "ErrorApi/";
  public configApiRetry =environment. cmsServerConfig.configApiRetry;


  ServiceErrorApi<TOut>(model: any) {
    return (
      this.http
        .post(this.baseUrl + "/Add", {
          headers: this.getHeaders(),
        })
        .pipe(
          retry(this.configApiRetry),
          catchError(this.handleError),
          map((ret: ErrorExcptionResult<TOut>) => {
            return this.errorExcptionResultCheck(ret);
          })
        )
    );
  }
  errorExcptionResultCheck<TOut>(model: ErrorExcptionResult<TOut>) {
    if (model) {
      if (model.IsSuccess) {

      } else {
        this.toastrService.error(model.ErrorMessage, "خطا در دریافت از سرور");
      }
    }
    return model;
  }

}
