import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutes } from './core.routing';
import { CoreConfigurationService } from 'app/@cms/cmsService/core/coreConfiguration.service';
import { CoreGuideService } from 'app/@cms/cmsService/core/coreGuide.service';
import { CoreLocationService } from 'app/@cms/cmsService/core/coreLocation.service';
import { CoreModuleService } from 'app/@cms/cmsService/core/coreModule.service';
import { CoreModuleProcessService } from 'app/@cms/cmsService/core/coreModuleProcess.service';
import { CoreModuleProcessCustomizeService } from 'app/@cms/cmsService/core/coreModuleProcessCustomize.service';
import { CoreModuleSiteService } from 'app/@cms/cmsService/core/coreModuleSite.service';
import { CoreSiteService } from 'app/@cms/cmsService/core/coreSite.service';
import { CoreSiteCategoryService } from 'app/@cms/cmsService/core/coreSiteCategory.service';
import { CoreSiteCategoryCmsModuleService } from 'app/@cms/cmsService/core/coreSiteCategoryCmsModule.service';
import { CoreSiteCategoryModuleService } from 'app/@cms/cmsService/core/coreSiteCategoryModule.service';
import { CoreUserBadLoginService } from 'app/@cms/cmsService/core/coreUserBadLogin.service';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutes,
  ],
  declarations: [],
  exports: [


  ],
  providers:[

    CoreConfigurationService
    ,CoreGuideService
    ,CoreLocationService
    ,CoreModuleService
    ,CoreModuleProcessService
    ,CoreModuleProcessCustomizeService
    ,CoreModuleSiteService
    ,CoreSiteService
    ,CoreSiteCategoryService
    ,CoreSiteCategoryCmsModuleService
    ,CoreUserBadLoginService
    ,CoreSiteCategoryModuleService

  ]
})
export class CoreModule { }
