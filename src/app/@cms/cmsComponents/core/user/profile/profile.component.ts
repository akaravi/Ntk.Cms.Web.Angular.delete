import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import {
  AuthUserChangePasswordModel,
  CoreAuthService,
  CoreUserModel,
  CoreUserService,
} from 'ntk-cms-api';
import { CmsToastrServiceService } from 'app/@cms/cmsService/base/cmsToastrService.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class CoreUserProfileComponent implements OnInit {
  @ViewChild('f', { static: false }) CoreUserEditForm: NgForm;
  CorrectUserInfo: CoreUserModel = new CoreUserModel();
  // CoreUserEditFormGroup: FormGroup;

  CoreUserPasswordEditformGroup: FormGroup;
  onSubmitCoreUserPasswordEditRun = false;
  // Variable Declaration
  currentPage = 'About';
  constructor(
    private coreUserService: CoreUserService,
    private toastrService: CmsToastrServiceService,
    private publicHelper: PublicHelper,
    private cmsAuthService: CoreAuthService
  ) {}
  ngOnInit() {
    // this.CoreUserEditformGroup = new FormGroup({
    //   Name: new FormControl(),
    //   LastName: new FormControl(),
    //   BirthDay: new FormControl(),
    //   Gender: new FormControl(),
    //   FullName: new FormControl(),
    //   Address: new FormControl(),
    //   PostalCode: new FormControl(),
    //   FirewallAllowIP: new FormControl(),
    // });

    this.CoreUserPasswordEditformGroup = new FormGroup(
      {
        OldPassword: new FormControl('', Validators.required),
        NewPassword: new FormControl('', Validators.required),
        NewPasswordConfirm: new FormControl('', Validators.required),
      },
      this.passwordMatchValidator
    );

    this.coreUserService.ServiceCurrectUser().subscribe(
      (next) => {
        this.CorrectUserInfo = next.Item;
        this.coreUserService.SetCorrectUser(this.CorrectUserInfo);
      },
      (error) => {
        this.toastrService.toastr.error(
          this.publicHelper.CheckError(error),
          'خطا در ورود'
        );
      }
    );
  }
  passwordMatchValidator(g: FormGroup) {
    return g.get('NewPassword').value === g.get('NewPasswordConfirm').value
      ? null
      : { mismath: true };
  }
  showPage(page: string) {
    this.currentPage = page;
  }
  onSubmitCoreUserPasswordEdit() {
    const model: AuthUserChangePasswordModel = new AuthUserChangePasswordModel();
    if (!this.CoreUserPasswordEditformGroup.valid) {
      return;
    }
    model.OldPassword = this.CoreUserPasswordEditformGroup.get(
      'OldPassword'
    ).value;
    model.NewPassword = this.CoreUserPasswordEditformGroup.get(
      'NewPassword'
    ).value;
    this.cmsAuthService.ServiceChangePassword(model).subscribe(
      (next) => {
        if (next.IsSuccess) {
          this.onSubmitCoreUserPasswordEditRun = true;
        }
      },
      (error) => {
        this.toastrService.toastr.error(
          this.publicHelper.CheckError(error),
          'خطا در تغییر پسورد'
        );
      }
    );
  }

  onSubmitCoreUserEdit() {
    // if (!this.CoreUserEditformGroup.valid) {
    //   return;
    // }

    this.coreUserService.ServiceEdit(this.CorrectUserInfo).subscribe(
      (next) => {
        if (next.IsSuccess) {
          this.toastrService.toastr.success(
            'اطلاعات شما با موفقیت ثبت گردید',
            ' ثبت تغییرات'
          );
          this.CorrectUserInfo = next.Item;
          this.coreUserService.SetCorrectUser(this.CorrectUserInfo);
        }
      },
      (error) => {
        this.toastrService.toastr.error(
          this.publicHelper.CheckError(error),
          'خطا در ثبت تغییرات'
        );
      }
    );
  }
}
