import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BankPaymentRoutes } from "./bankPayment.routing";
import { TreeModule } from "angular-tree-component";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { NgxQueryBuilderModule } from "ngx-query-builder";
import { FormsModule } from "@angular/forms";

import { QuillModule } from "ngx-quill";
import { CmsSharedModule } from 'app/@cms/shared/cmsShared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BankPaymentRoutes,
    NgxDatatableModule,
    TreeModule.forRoot(),
    //NgxQueryBuilderModule,

    QuillModule,
    CmsSharedModule
  ],
  declarations: [
    //
    BankPaymentpublicConfigAddComponent,
    BankPaymentpublicConfigEditComponent,
    BankPaymentpublicConfigDeleteComponent,
    BankPaymentpublicConfigListComponent,
    BankPaymentpublicConfigSelectComponent,
    //
    BankPaymentPrivateSiteConfigAddComponent,
    BankPaymentPrivateSiteConfigEditComponent,
    BankPaymentPrivateSiteConfigDeleteComponent,
    BankPaymentPrivateSiteConfigListComponent,
    BankPaymentPrivateSiteConfigSelectComponent,
    //
    BankPaymentTransactionAddComponent,
    BankPaymentTransactionEditComponent,
    BankPaymentTransactionDeleteComponent,
    BankPaymentTransactionListComponent,
    BankPaymentTransactionSelectComponent,
    //
    BankPaymentTransactionLogAddComponent,
    BankPaymentTransactionLogEditComponent,
    BankPaymentTransactionLogDeleteComponent,
    BankPaymentTransactionLogListComponent,
    BankPaymentTransactionLogSelectComponent,
  ],
  exports: [


  ],
  providers: [BankPaymentMainApiPathCompanyService, BankPaymentMainApiPathService],
  //,schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class BankPaymentModule {}
