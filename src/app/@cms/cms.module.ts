import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsRoutes } from './cms.routing';
import { CmsFullLayoutComponent } from './layouts/full/cmsFull-layout.component';
import { CmsContentLayoutComponent } from './layouts/content/cmsContent-layout.component';
import { CmsSharedModule } from './shared/cmsShared.module';
import {UploadFileComponent} from './cmsComponents/filemanager/upload-file/upload-file.component';
import { FlowInjectionToken, NgxFlowModule } from '@flowjs/ngx-flow';
import Flow from '@flowjs/flow.js';
@NgModule({
  imports: [
    CommonModule,
    CmsRoutes,
    CmsSharedModule,
    NgxFlowModule
  ],
  declarations: [
    CmsFullLayoutComponent,
    CmsContentLayoutComponent,
    UploadFileComponent

  ],
  providers:[

    {
      provide: FlowInjectionToken,
      useValue: Flow,
    },
  ]
})
export class CmsModule { }
