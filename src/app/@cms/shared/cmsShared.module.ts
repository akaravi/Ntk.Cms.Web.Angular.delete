import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

//COMPONENTS
import { CmsFooterComponent } from './footer/footer.component';
import { CmsNavbarComponent } from './navbar/navbar.component';
import { CmsSidebarComponent } from './sidebar/sidebar.component';
import { CmsCustomizerComponent } from './customizer/customizer.component';
import { CmsNotificationSidebarComponent } from './notification-sidebar/notification-sidebar.component';


//DIRECTIVES
import { SidebarDirective } from 'app/@cms/shared/directives/sidebar.directive';
import { SidebarLinkDirective } from 'app/@cms/shared/directives/sidebarlink.directive';
import { SidebarListDirective } from 'app/@cms/shared/directives/sidebarlist.directive';
import { SidebarAnchorToggleDirective } from 'app/@cms/shared/directives/sidebaranchortoggle.directive';
import { SidebarToggleDirective } from 'app/@cms/shared/directives/sidebartoggle.directive';
import { CmsTokenAccessAdminComponent } from '../cmsComponents/_base/cmsTokenAccessAdmin/cmsTokenAccessAdmin.component';
import { CmsSearchContentListComponent } from '../cmsComponents/_base/cmsSearchContentList/cmsSearchContentList.component';
import { NgxQueryBuilderModule } from 'ngx-query-builder';
import { FormsModule } from '@angular/forms';

@NgModule({
    exports: [
        CommonModule,
        NgbModule,
        TranslateModule,
        CmsFooterComponent,
        CmsNavbarComponent,
        CmsSidebarComponent,
        CmsCustomizerComponent,
        CmsNotificationSidebarComponent,
        SidebarDirective,
        
        CmsSearchContentListComponent,
        

    ],
    imports: [
        RouterModule,
        FormsModule ,
        CommonModule,
        NgbModule,
        TranslateModule,
        PerfectScrollbarModule,
        NgxQueryBuilderModule
    ],
    declarations: [
        CmsFooterComponent,
        CmsNavbarComponent,
        CmsSidebarComponent,
        CmsCustomizerComponent,
        CmsNotificationSidebarComponent,
        SidebarDirective,
        SidebarLinkDirective,
        SidebarListDirective,
        SidebarAnchorToggleDirective,
        SidebarToggleDirective,
        CmsTokenAccessAdminComponent,

        CmsSearchContentListComponent
    ]
})
export class CmsSharedModule { }
