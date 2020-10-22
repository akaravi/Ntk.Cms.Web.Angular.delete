import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { BankPaymentMainApiPathListComponent } from './mainApiPath/bankPaymentMainApiPathList/bankPaymentMainApiPathList.component';
import { BankPaymentMainApiPathAddComponent } from './mainApiPath/bankPaymentMainApiPathAdd/bankPaymentMainApiPathAdd.component';
import { BankPaymentMainApiPathEditComponent } from './mainApiPath/bankPaymentMainApiPathEdit/bankPaymentMainApiPathEdit.component';
import { BankPaymentMainApiPathCompanyListComponent } from './mainApiPathCompany/bankPaymentMainApiPathCompanyList/bankPaymentMainApiPathCompanyList.component';
import { BankPaymentMainApiPathCompanyAddComponent } from './mainApiPathCompany/bankPaymentMainApiPathCompanyAdd/bankPaymentMainApiPathCompanyAdd.component';
import { BankPaymentMainApiPathCompanyEditComponent } from './mainApiPathCompany/bankPaymentMainApiPathCompanyEdit/bankPaymentMainApiPathCompanyEdit.component';
const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "apipath",
        children: [
          {
            path: "",
            component: BankPaymentMainApiPathListComponent,
            data: {
              title: "login to Panle",
            },
          },
          {
            path: "list",
            component: BankPaymentMainApiPathListComponent,
            data: {
              title: "login to Panle",
            },
          },
          {
            path: "add",
            component: BankPaymentMainApiPathAddComponent,
            data: {
              title: "Register New Acount",
            },
          },
          {
            path: "edit",
            component: BankPaymentMainApiPathEditComponent,
            data: {
              title: "forgot password You Acount",
            },
          }
        ],

      },
      {
        path: "apipathcompany",
        children: [
          {
            path: "",
            component: BankPaymentMainApiPathCompanyListComponent,
            data: {
              title: "login to Panle",
            },
          },
          {
            path: "list",
            component: BankPaymentMainApiPathCompanyListComponent,
            data: {
              title: "login to Panle",
            },
          },
          {
            path: "add",
            component: BankPaymentMainApiPathCompanyAddComponent,
            data: {
              title: "Register New Acount",
            },
          },
          {
            path: "edit",
            component: BankPaymentMainApiPathCompanyEditComponent,
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
export class BankPaymentRoutes {}
