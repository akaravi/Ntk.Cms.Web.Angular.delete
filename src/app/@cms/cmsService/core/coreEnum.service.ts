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
export class CoreEnumService extends ApiServerBase<number> implements OnDestroy {
  subManager = new Subscription();
  
  getModuleCotrolerUrl() {
    return "CoreEnum";
  }
  childConstructor() {}
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  ////
  //resultEnumRecord
  ////
  resultEnumRecordStatus = new ErrorExcptionResult<enumModel>();
  resultEnumRecordStatusBSub = new BehaviorSubject<
    ErrorExcptionResult<enumModel>
  >(null);
  resultEnumRecordStatusObs = this.resultEnumRecordStatusBSub.asObservable();
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
  ////
  //resultEnumRecord
  ////
  ////
  //EnumLocationType
  ////
  resultEnumLocationType = new ErrorExcptionResult<enumModel>();
  resultEnumLocationTypeBSub = new BehaviorSubject<
    ErrorExcptionResult<enumModel>
  >(null);
  resultEnumLocationTypeObs = this.resultEnumLocationTypeBSub.asObservable();
  ServiceEnumLocationType() {
    if (
      this.resultEnumLocationType &&
      this.resultEnumLocationType.IsSuccess &&
      this.resultEnumLocationType.ListItems &&
      this.resultEnumLocationType.ListItems.length > 0
    )
      return;
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
  ////
  //EnumLocationType
  ////

  ////
  //EnumUserLanguage
  ////
  resultEnumUserLanguage = new ErrorExcptionResult<enumModel>();
  resultEnumUserLanguageBSub = new BehaviorSubject<
    ErrorExcptionResult<enumModel>
  >(null);
  resultEnumUserLanguageObs = this.resultEnumUserLanguageBSub.asObservable();
  ServiceEnumUserLanguage() {
    if (
      this.resultEnumUserLanguage &&
      this.resultEnumUserLanguage.IsSuccess &&
      this.resultEnumUserLanguage.ListItems &&
      this.resultEnumUserLanguage.ListItems.length > 0
    )
      return;
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
    ////
  //EnumUserLanguage
  ////
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
