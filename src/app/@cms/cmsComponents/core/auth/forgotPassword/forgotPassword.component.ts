import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CmsAuthService } from '../../../../cmsService/core/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../cmsStore';
import { ToastrService } from 'ngx-toastr';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';
import { environment } from 'environments/environment';
import { CaptchaModel } from 'app/@cms/cmsModels/base/captchaModel';
import { CmsToastrServiceService } from 'app/@cms/cmsService/_base/cmsToastrService.service';

@Component({
  selector: 'app-cms-forgot-password',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy  {
  @ViewChild('f', { static: false }) loginForm: NgForm;
  subManager = new Subscription();
  model: any = {};
  captchaModel: CaptchaModel = new CaptchaModel();

  returnUrl: any = '';
  _cmsUiConfig=environment.cmsUiConfig;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cmsAuthService: CmsAuthService,
    private toastrService: CmsToastrServiceService,
    private store: Store<fromStore.State>,
    private publicHelper: PublicHelper
  ) {}

  ngOnInit() {
    this.model.isremember = true;
    this.subManager.add(
      this.route.queryParams.subscribe(
        (params) => (this.returnUrl = params.return)
      )
    );
    this.onCaptchaOrder();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  // On submit click, reset form fields
  onSubmit() {
    this.model.captchaKey= this.captchaModel.Key;
    this.subManager.add(
      this.cmsAuthService.ServiceForgetPassword(this.model).subscribe(
        (next) => {
          if (next.IsSuccess) {
            this.store.dispatch(new fromStore.InitHub());
            if (this.returnUrl === null || this.returnUrl === undefined) {
              this.returnUrl = this.cmsAuthService.getLoginUrl();
            }
            this.router.navigate([this.returnUrl]);
          }
        },
        (error) => {
          this.toastrService.toastr.error(
            this.publicHelper.CheckError(error),
            'خطا در بازیابی پسورد'
          );
        }
      )
    );
  }
  onCaptchaOrder() {
    this.subManager.add(
      this.cmsAuthService.ServiceCaptcha().subscribe(
        (next) => {
          this.captchaModel = next.Item;
        },
        (error) => {
          this.toastrService.toastr.error(
            this.publicHelper.CheckError(error),
            "خطا در دریافت عکس کپچا"
          );
        }
      )
    );
  }
}
