import { Injectable, OnDestroy } from "@angular/core";
import { map } from "rxjs/operators";
import { ErrorExcptionResult } from "app/@cms/cmsModels/base/errorExcptionResult";
import { FilterModel } from "app/@cms/cmsModels/base/filterModel";
import { retry, catchError } from "rxjs/operators";
import { ApiServerBase } from "./apiServerBase.service";

@Injectable({
  providedIn: "root",
})
export class ApiCmsServerBase<TOut, TKey>
  extends ApiServerBase
  implements OnDestroy {
  ServiceViewModel() {
    this.loadingStatus=true;
    return this.http
      .get(this.baseUrl + this.getModuleCotrolerUrl() + "/ViewModel", {
        headers: this.getHeaders(),
      })
      .pipe(
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }

  ServiceGetAll(model: FilterModel) {
    this.loadingStatus=true;
    if (model == null) model = new FilterModel();

    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/getAll", model, {
        headers: this.getHeaders(),
      })
      .pipe(
        // tap(_ => console.log("tap:1")),
        // debounceTime(200),
        // //switchMap(() => this._search()),
        // delay(200),

        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }

  ServiceGetOneById(id: TKey) {
    this.loadingStatus=true;
    return this.http
      .get(this.baseUrl + this.getModuleCotrolerUrl() + "/" + id, {
        headers: this.getHeaders(),
      })
      .pipe(
        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }

  ServiceGetCount(model: FilterModel) {
    this.loadingStatus=true;
    if (model == null) model = new FilterModel();

    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/Count", model, {
        headers: this.getHeaders(),
      })
      .pipe(
        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }
  ServiceExportFile(model: FilterModel) {
    this.loadingStatus=true;
    if (model == null) model = new FilterModel();

    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/ExportFile", model, {
        headers: this.getHeaders(),
      })
      .pipe(
        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }
  ServiceAdd(model: any) {
    this.loadingStatus=true;
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/", model, {
        headers: this.getHeaders(),
      })
      .pipe(
        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }

  ServiceEdit(model: any) {
    this.loadingStatus=true;
    return this.http
      .put(this.baseUrl + this.getModuleCotrolerUrl() + "/", model, {
        headers: this.getHeaders(),
      })
      .pipe(
        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }

  ServiceDelete(id: TKey) {
    this.loadingStatus=true;
    return this.http
      .delete(this.baseUrl + this.getModuleCotrolerUrl() + "/" + id, {
        headers: this.getHeaders(),
      })
      .pipe(
        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }
  ServiceDeleteList(ids: Array<TKey>) {
    this.loadingStatus=true;
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/DeleteList", ids, {
        headers: this.getHeaders(),
      })
      .pipe(
        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }
}
