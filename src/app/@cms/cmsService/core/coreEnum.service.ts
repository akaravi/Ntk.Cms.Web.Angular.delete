import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Subscription } from "rxjs";
import { ErrorExcptionResult } from "app/@cms/cmsModels/base/errorExcptionResult";
import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { environment } from "environments/environment";
import { MenuPlaceType } from "app/@cms/cmsModels/Enums/menuPlaceType.enum";
import { enumModel } from "app/@cms/cmsModels/base/enumModel";
import { ApiServerBase } from "../_base/apiServerBase.service";

@Injectable({
  providedIn: "root",
})
export class CoreEnumService extends ApiServerBase implements OnDestroy {
  subManager = new Subscription();
  resultEnumRecordStatus = new ErrorExcptionResult<enumModel>();
  resultEnumRecordStatusBSub = new BehaviorSubject<
    ErrorExcptionResult<enumModel>
  >(null);
  resultEnumRecordStatusObs = this.resultEnumRecordStatusBSub.asObservable();
  getModuleCotrolerUrl() {
    return "CoreEnum";
  }
  childConstructor() {}
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }

  ServiceEnumRecordStatus() {
    if (
      this.resultEnumRecordStatus &&
      this.resultEnumRecordStatus.IsSuccess &&
      this.resultEnumRecordStatus.ListItems &&
      this.resultEnumRecordStatus.ListItems.length > 0
    )
      return;

    return this.http
      .get(this.baseUrl + this.getModuleCotrolerUrl() + "/EnumRecordStatus", {
        headers: this.getHeaders(),
      })
      .pipe(
        map((ret: ErrorExcptionResult<enumModel>) => {
          if (ret) {
            this.resultEnumRecordStatusBSub.next(ret);
            this.resultEnumRecordStatus = ret;
            //return ret;
          }
        })
      )
      .toPromise();
  }
  ServiceEnumLocationType() {
    return this.http
      .get(this.baseUrl + this.getModuleCotrolerUrl() + "/EnumLocationType", {
        headers: this.getHeaders(),
      })
      .pipe(
        map((ret: ErrorExcptionResult<enumModel>) => {
          if (ret) {
            return ret;
          }
        })
      );
  }
  ServiceEnumUserLanguage() {
    return this.http
      .get(this.baseUrl + this.getModuleCotrolerUrl() + "/EnumUserLanguage", {
        headers: this.getHeaders(),
      })
      .pipe(
        map((ret: ErrorExcptionResult<enumModel>) => {
          if (ret) {
            return ret;
          }
        })
      );
  }
  ServiceEnumGender() {
    return this.http
      .get(this.baseUrl + this.getModuleCotrolerUrl() + "/EnumGender", {
        headers: this.getHeaders(),
      })
      .pipe(
        map((ret: ErrorExcptionResult<enumModel>) => {
          if (ret) {
            return ret;
          }
        })
      );
  }
  ServiceEnumMenuPlaceType() {
    return this.http
      .get(this.baseUrl + this.getModuleCotrolerUrl() + "/EnumMenuPlaceType", {
        headers: this.getHeaders(),
      })
      .pipe(
        map((ret: ErrorExcptionResult<MenuPlaceType>) => {
          if (ret) {
            return ret;
          }
        })
      );
  }
}
