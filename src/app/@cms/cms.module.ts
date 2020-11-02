import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CmsRoutes } from "./cms.routing";
import { CmsFullLayoutComponent } from "./layouts/full/cmsFull-layout.component";
import { CmsContentLayoutComponent } from "./layouts/content/cmsContent-layout.component";
import { CmsSharedModule } from "./shared/cmsShared.module";
import { CoreAuthService } from 'ntk-cms-api';



@NgModule({
  imports: [
    CommonModule,
    CmsRoutes,
    CmsSharedModule,




  ],
  declarations: [
    CmsFullLayoutComponent,
    CmsContentLayoutComponent,


  ], exports: [


  ],
  
})
export class CmsModule { }
