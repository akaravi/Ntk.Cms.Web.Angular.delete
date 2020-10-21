import { Injectable, OnDestroy } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import * as fromStore from "../../cmsStore";
import { TokenInfoModel } from "app/@cms/cmsModels/base/tokenInfoModel";
import { Subscription, BehaviorSubject } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import {
  ErrorExcptionResult,
  ErrorExcptionResultBase,
} from "app/@cms/cmsModels/base/errorExcptionResult";
import {
  AuthRenewTokenModel,
  AuthUserSignOutModel,
  AuthUserSignInModel,
  AuthUserSignUpModel,
  AuthUserChangePasswordModel,
  AuthUserForgetPasswordModel,
} from "app/@cms/cmsModels/core/authModel";
import { environment } from "environments/environment";
import { FilterModel } from "app/@cms/cmsModels/base/filterModel";
import { CaptchaModel } from "app/@cms/cmsModels/base/captchaModel";
import { ApiServerBase } from "../_base/apiServerBase.service";

@Injectable()
export class CmsAuthService extends ApiServerBase implements OnDestroy {
  CorrectTokenInfoBS = new BehaviorSubject<TokenInfoModel>(null);
  CorrectTokenInfoBSObs = this.CorrectTokenInfoBS.asObservable();

  subManager = new Subscription();

  tokenString: string;
  baseUrl = environment.cmsServerConfig.configApiServerPath + "auth/";
  jwtHelper = new JwtHelperService();
  userRoles: string[] = [];
  userName = "";

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }

  SetCorrectTokenInfo(model: TokenInfoModel) {
    if (model == null) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return;
    }
    localStorage.setItem("token", model.token);
    localStorage.setItem("refreshToken", model.refresh_token);

    this.CorrectTokenInfoBS.next(model);
    this.store.dispatch(new fromStore.EditLoggedUser(model));
    const decodedToken = this.jwtHelper.decodeToken(model.token);
    this.store.dispatch(new fromStore.EditDecodedToken(decodedToken));
    //this.userRoles = decodedToken.role as Array<string>;
    
  }
  CorrectTokenInfoBSRenew() {
    const token = this.CheckToken();

    if (!token || token === "null") return;
    return this.http
      .get(this.baseUrl + "CorrectToken", { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TokenInfoModel>) => {
          if (ret) {
            if (ret.IsSuccess) {
              this.SetCorrectTokenInfo(ret.Item);
              let title = "تایید توکن";
              let message = "توکن شما مورد تایید سرور قرار گرفت";
              this.toastrService.success(message, title);
            } else {
              let title = "تایید توکن";
              let message =
                "توکن شما مورد تایید سرور نبود . مجددا وار حساب کاربری شوید";
              this.toastrService.error(message, title);
              this.router.navigate([environment.cmsUiConfig.Pathlogin]);
            }
            return ret;
          }
        })
      )
      .toPromise();
    // this.ServiceRenewToken(null).subscribe(
    //   (next) => {
    //     if (next.IsSuccess) {
    //       this.SetCorrectTokenInfo(next.Item);
    //     }
    //   },
    //   (error) => {}
    // );
  }


  ServiceCaptcha() {
    return this.http.get(this.baseUrl + "captcha").pipe(
      map((ret: ErrorExcptionResult<CaptchaModel>) => {
        if (ret) {
          if (ret.IsSuccess) {
          } else {
            this.toastrService.error(
              ret.ErrorMessage,
              "خطا در دریافت  کلید عکس کپتچا"
            );
          }
          return ret;
        }
      })
    );
  }
  ServiceSignupUser(model: AuthUserSignUpModel) {
    return this.http.post(this.baseUrl + "signup", model).pipe(
      catchError(this.handleError),
      map((ret: ErrorExcptionResult<TokenInfoModel>) => {
        if (ret) {
          if (ret.IsSuccess) {
            this.toastrService.success("با موفقیت ثبت نام شدید", "موفق");
          } else {
            this.toastrService.error(ret.ErrorMessage, "خطا در ثبت نام");
          }
          return ret;
        }
      })
    );
  }

  ServiceSigninUser(model: AuthUserSignInModel) {
    return this.http.post(this.baseUrl + "signin", model).pipe(
      catchError(this.handleError),
      map((ret: ErrorExcptionResult<TokenInfoModel>) => {
        if (ret) {
          if (ret.IsSuccess) {
            this.toastrService.success("با موفقیت وارد شدید", "موفق");

            this.SetCorrectTokenInfo(ret.Item);
          } else {
            this.toastrService.error(ret.ErrorMessage, "خطا در ورود");
          }
          return ret;
        }
      })
    );
  }

  ServiceRenewToken(model: AuthRenewTokenModel) {
    if (model == null) model = new AuthRenewTokenModel();
    return this.http
      .post(this.baseUrl + "renewToken", model, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TokenInfoModel>) => {
          if (ret) {
            if (ret.IsSuccess) {
              this.SetCorrectTokenInfo(ret.Item);
            } else {
              this.toastrService.error(ret.ErrorMessage, "خطا در دریافت توکن");
            }
            return ret;
          }
        })
      );
  }
  ServiceChangePassword(model: AuthUserChangePasswordModel) {
    return this.http
      .post(this.baseUrl + "changePassword", model, {
        headers: this.getHeaders(),
      })
      .pipe(
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TokenInfoModel>) => {
          if (ret) {
            if (ret.IsSuccess) {
              this.toastrService.success(
                "تغییر پسورد با موفقیت انجام شد",
                "موفق"
              );
            } else {
              this.toastrService.error(
                ret.ErrorMessage,
                "خطا در تغییر  پسورد حساب کاربری"
              );
            }
            return ret;
          }
        })
      );
  }
  ServiceForgetPassword(model: AuthUserForgetPasswordModel) {
    return this.http.post(this.baseUrl + "forgetPassword", model).pipe(
      catchError(this.handleError),
      map((ret: ErrorExcptionResult<TokenInfoModel>) => {
        if (ret) {
          if (ret.IsSuccess) {
            this.toastrService.success(
              "دستور عمل بازیابی پسورد به آدرس ایمیل شما ارسال شد",
              "موفق"
            );
          } else {
            this.toastrService.error(ret.ErrorMessage, "خطا در بازیابی پسورد");
          }
          return ret;
        }
      })
    );
  }
  ServiceLogout(model: AuthUserSignOutModel = new AuthUserSignOutModel()) {
    return this.http
      .post(this.baseUrl + "signOut", model, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError),
        map((ret: ErrorExcptionResultBase) => {
          if (ret) {
            this.tokenString = null;

            this.SetCorrectTokenInfo(null);

            this.toastrService.success("خروح شما با موفقیت انجام شد", "موفق");

            return ret;
          }
        })
      );
  }

  ServiceExistToken(model: FilterModel) {
    if (model == null) model = new FilterModel();

    return this.http
      .post(this.baseUrl + "existToken", model, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError),
        map((ret: ErrorExcptionResultBase) => {
          if (ret) {
            return ret;
          }
        })
      );
  }

  getToken() {
    return this.tokenString;
  }
  loggedIn() {
    let user: TokenInfoModel;
    this.subManager.add(
      this.store.select(fromStore.getLoggedUserState).subscribe((data) => {
        user = data;
      })
    );

    const token = this.CheckToken();
    if (token == null || token == undefined) {
      return false;
    }
    let parts = token.split(".");
    if (parts.length !== 3) {
      return false;
    }
    let decoded = this.jwtHelper.urlBase64Decode(parts[1]);
    if (!decoded) {
      return false;
    }
    // if (user.provider === 'GOOGLE' || user.provider === 'FACEBOOK') {
    //   var socialUser: SocialUser;
    //   this.socialAuthService.authState.subscribe((user) => {
    //     socialUser = user;
    //   });
    //   if (socialUser == null) {
    //     return false
    //   }
    // }
    return true;
  }

  isAuthenticated(): boolean {
    const token = this.CheckToken();
    if (token && token !== "null" && !this.jwtHelper.isTokenExpired(token)) {
      let user: TokenInfoModel;
      this.subManager.add(
        this.store.select(fromStore.getLoggedUserState).subscribe((data) => {
          user = data;
        })
      );
      // if (user.provider === 'GOOGLE' || user.provider === 'FACEBOOK') {
      //   var socialUser: SocialUser;
      //   this.socialAuthService.authState.subscribe((user) => {
      //     socialUser = user;
      //   });
      //   if (socialUser == null) {
      //     return false
      //   }
      // }
      return true;
    } else {
      return true; // false;
    }
  }
  isAdmin(): boolean {
    if (this.roleMatch(["Admin"])) {
      return true;
    }
    return false;
  }
  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles = this.userRoles;
    if (Array.isArray(userRoles)) {
      allowedRoles.forEach((element) => {
        if (userRoles.includes(element)) {
          isMatch = true;
          return;
        }
      });
    } else {
      allowedRoles.forEach((element) => {
        if (userRoles === element) {
          isMatch = true;
          return;
        }
      });
    }
    return isMatch;
  }
  getDashboardUrl(): string {
    return "core/site/select";
  }
  getLoginUrl(): string {
    return "/auth/login";
  }
}
