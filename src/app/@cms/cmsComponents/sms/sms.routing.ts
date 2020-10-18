import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { SmsMainApiPathListComponent } from './mainApiPath/smsMainApiPathList/smsMainApiPathList.component';
import { SmsMainApiPathAddComponent } from './mainApiPath/smsMainApiPathAdd/smsMainApiPathAdd.component';
import { SmsMainApiPathEditComponent } from './mainApiPath/smsMainApiPathEdit/smsMainApiPathEdit.component';
import { SmsMainApiPathCompanyListComponent } from './mainApiPathCompany/smsMainApiPathCompanyList/smsMainApiPathCompanyList.component';
import { SmsMainApiPathCompanyAddComponent } from './mainApiPathCompany/smsMainApiPathCompanyAdd/smsMainApiPathCompanyAdd.component';
import { SmsMainApiPathCompanyEditComponent } from './mainApiPathCompany/smsMainApiPathCompanyEdit/smsMainApiPathCompanyEdit.component';
const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "mainapipath",
        children: [
          {
            path: "",
            component: SmsMainApiPathListComponent,
            data: {
              title: "login to Panle",
            },
          },
          {
            path: "list",
            component: SmsMainApiPathListComponent,
            data: {
              title: "login to Panle",
            },
          },
          {
            path: "add",
            component: SmsMainApiPathAddComponent,
            data: {
              title: "Register New Acount",
            },
          },
          {
            path: "edit",
            component: SmsMainApiPathEditComponent,
            data: {
              title: "forgot password You Acount",
            },
          }
        ],

      },
      {
        path: "mainapipathcompany",
        children: [
          {
            path: "",
            component: SmsMainApiPathCompanyListComponent,
            data: {
              title: "login to Panle",
            },
          },
          {
            path: "list",
            component: SmsMainApiPathCompanyListComponent,
            data: {
              title: "login to Panle",
            },
          },
          {
            path: "add",
            component: SmsMainApiPathCompanyAddComponent,
            data: {
              title: "Register New Acount",
            },
          },
          {
            path: "edit",
            component: SmsMainApiPathCompanyEditComponent,
            data: {
              title: "forgot password You Acount",
            },
          }
        ],
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsRoutes {}
