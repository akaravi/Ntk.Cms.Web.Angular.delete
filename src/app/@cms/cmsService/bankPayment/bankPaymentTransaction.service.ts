import { Injectable, OnDestroy } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { ApiCmsServerBase } from "../_base/apiCmsServerBase.service";
import { FilterModel } from "app/@cms/cmsModels/base/filterModel";
import { ErrorExcptionResult } from "app/@cms/cmsModels/base/errorExcptionResult";
import { catchError, map, retry } from "rxjs/operators";
import { BankPaymentTransactionModel } from "app/@cms/cmsModels/BankPayment/bankPaymentTransactionModel";

export class BankPaymentTransactionService
  extends ApiCmsServerBase<BankPaymentTransactionModel, number>
  implements OnDestroy {
  

  getModuleCotrolerUrl() {
    return "BankPaymentTransaction";
  }

  
}
