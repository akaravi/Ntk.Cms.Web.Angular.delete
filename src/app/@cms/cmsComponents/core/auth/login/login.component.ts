import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../cmsStore';
import { ToastrService } from 'ngx-toastr';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';
import {
  AuthUserSignInModel,
  CaptchaModel,
  CoreAuthService,
} from 'ntk-cms-api';
import { CmsToastrServiceService } from 'app/@cms/cmsService/base/cmsToastrService.service';
import { environment } from '../../../../../../environments/environment';
@Component({
  selector: 'app-cms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) loginForm: NgForm;
  subManager = new Subscription();
  model: AuthUserSignInModel = new AuthUserSignInModel();
  returnUrl: any = '';
  captchaModel: CaptchaModel = new CaptchaModel();
  // emit value in sequence every 10 second
  source = interval(1000 * 60 * 5);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cmsAuthService: CoreAuthService,
    private toastrService: CmsToastrServiceService,
    private store: Store<fromStore.State>,
    private publicHelper: PublicHelper
  ) {}
  ngOnInit() {
    this.model.IsRemember = false;
    this.model.Email = '';

    this.subManager.add(
      this.route.queryParams.subscribe(
        (params) => (this.returnUrl = params.return)
      )
    );
    this.onCaptchaOrder();
    this.subManager = this.source.subscribe((val) => this.onCaptchaOrder());
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }

  // On submit button click
  onSubmit() {
    this.model.captchaKey = this.captchaModel.Key;
    this.subManager.add(
      this.cmsAuthService.ServiceSigninUser(this.model).subscribe(
        (next) => {
          if (next.IsSuccess) {
            this.store.dispatch(new fromStore.InitHub());
            if (this.returnUrl === null || this.returnUrl === undefined) {
              this.returnUrl = environment.cmsUiConfig.PathSelectSite;
            }
            this.router.navigate([this.returnUrl]);
          } else {
            this.onCaptchaOrder();
          }
        },
        (error) => {
          this.onCaptchaOrder();
          this.toastrService.toastr.error(
            this.publicHelper.CheckError(error),
            'خطا در ورود'
          );
        }
      )
    );
  }
  onCaptchaOrder() {
    this.model.captchaText = '';
    this.subManager.add(
      this.cmsAuthService.ServiceCaptcha().subscribe(
        (next) => {
          this.captchaModel = next.Item;
        },
        (error) => {
          this.toastrService.toastr.error(
            this.publicHelper.CheckError(error),
            'خطا در دریافت عکس کپچا'
          );
        }
      )
    );
  }
}
