import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SmsRoutes } from "./sms.routing";
import { TreeModule } from "angular-tree-component";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { NgxQueryBuilderModule } from "ngx-query-builder";
import { FormsModule } from "@angular/forms";

import { QuillModule } from "ngx-quill";

import { SmsMainApiPathCompanyService } from "app/@cms/cmsService/sms/smsMainApiPathCompany.service";
import { SmsMainApiPathService } from "app/@cms/cmsService/sms/smsMainApiPath.service";
import { CmsSharedModule } from 'app/@cms/shared/cmsShared.module';
import { SmsMainApiPathAddComponent } from './mainApiPath/add/smsMainApiPathAdd.component';
import { SmsMainApiPathDeleteComponent } from './mainApiPath/delete/smsMainApiPathDelete.component';
import { SmsMainApiPathEditComponent } from './mainApiPath/edit/smsMainApiPathEdit.component';
import { SmsMainApiPathListComponent } from './mainApiPath/list/smsMainApiPathList.component';
import { SmsMainApiPathSelectComponent } from './mainApiPath/select/smsMainApiPathSelect.component';
import { SmsMainApiPathCompanyAddComponent } from './mainApiPathCompany/add/smsMainApiPathCompanyAdd.component';
import { SmsMainApiPathCompanyDeleteComponent } from './mainApiPathCompany/delete/smsMainApiPathCompanyDelete.component';
import { SmsMainApiPathCompanyEditComponent } from './mainApiPathCompany/edit/smsMainApiPathCompanyEdit.component';
import { SmsMainApiPathCompanyListComponent } from './mainApiPathCompany/list/smsMainApiPathCompanyList.component';
import { SmsMainApiPathCompanySelectComponent } from './mainApiPathCompany/select/smsMainApiPathCompanySelect.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SmsRoutes,
    NgxDatatableModule,
    TreeModule.forRoot(),
    QuillModule,
    CmsSharedModule
  ],
  declarations: [
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
  exports: [


  ],
  providers: [SmsMainApiPathCompanyService, SmsMainApiPathService],
  //,schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SmsModule {}
