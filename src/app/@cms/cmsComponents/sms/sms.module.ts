import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SmsRoutes } from "./sms.routing";
import { TreeModule } from "angular-tree-component";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { CmsSearchContentListComponent } from "../_base/cmsSearchContentList/cmsSearchContentList.component";
import { NgxQueryBuilderModule } from "ngx-query-builder";
import { FormsModule } from "@angular/forms";

import { QuillModule } from "ngx-quill";
import { SmsMainApiPathListComponent } from "./mainApiPath/smsMainApiPathList/smsMainApiPathList.component";
import { SmsMainApiPathAddComponent } from "./mainApiPath/smsMainApiPathAdd/smsMainApiPathAdd.component";
import { SmsMainApiPathEditComponent } from "./mainApiPath/smsMainApiPathEdit/smsMainApiPathEdit.component";
import { SmsMainApiPathDeleteComponent } from "./mainApiPath/smsMainApiPathDelete/smsMainApiPathDelete.component";
import { SmsMainApiPathSelectComponent } from "./mainApiPath/smsMainApiPathSelect/smsMainApiPathSelect.component";
import { SmsMainApiPathCompanyListComponent } from "./mainApiPathCompany/smsMainApiPathCompanyList/smsMainApiPathCompanyList.component";
import { SmsMainApiPathCompanyAddComponent } from "./mainApiPathCompany/smsMainApiPathCompanyAdd/smsMainApiPathCompanyAdd.component";
import { SmsMainApiPathCompanyEditComponent } from "./mainApiPathCompany/smsMainApiPathCompanyEdit/smsMainApiPathCompanyEdit.component";
import { SmsMainApiPathCompanyDeleteComponent } from "./mainApiPathCompany/smsMainApiPathCompanyDelete/smsMainApiPathCompanyDelete.component";
import { SmsMainApiPathCompanySelectComponent } from "./mainApiPathCompany/smsMainApiPathCompanySelect/smsMainApiPathCompanySelect.component";
import { SmsMainApiPathCompanyService } from "app/@cms/cmsService/sms/smsMainApiPathCompany.service";
import { SmsMainApiPathService } from "app/@cms/cmsService/sms/smsMainApiPath.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SmsRoutes,
    NgxDatatableModule,
    TreeModule.forRoot(),
    NgxQueryBuilderModule,

    QuillModule,
  ],
  declarations: [
    CmsSearchContentListComponent,
    //
    SmsMainApiPathListComponent,
    SmsMainApiPathAddComponent,
    SmsMainApiPathEditComponent,
    SmsMainApiPathDeleteComponent,
    SmsMainApiPathSelectComponent,
    //
    SmsMainApiPathCompanyListComponent,
    SmsMainApiPathCompanyAddComponent,
    SmsMainApiPathCompanyEditComponent,
    SmsMainApiPathCompanyDeleteComponent,
    SmsMainApiPathCompanySelectComponent,
  ],
  exports: [],
  //,schemas:[CUSTOM_ELEMENTS_SCHEMA]
  providers: [SmsMainApiPathCompanyService, SmsMainApiPathService],
})
export class SmsModule {}
