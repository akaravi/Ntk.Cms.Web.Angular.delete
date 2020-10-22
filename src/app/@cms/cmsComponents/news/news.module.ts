import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutes } from './news.routing';
import { TreeModule } from 'angular-tree-component';
import { NewsContentAddComponent } from './content/add/contentAdd.component';
import { NewsContentListComponent } from './content/list/contentList.component';
import { NewsContentEditComponent } from './content/edit/contentEdit.component';
import { NewsContentSelectComponent } from './content/select/contentSelect.component';
import { NewsCategoryAddComponent } from './category/add/categoryAdd.component';
import { NewsCategoryEditComponent } from './category/edit/categoryEdit.component';
import { NewsCategoryListComponent } from './category/list/categoryList.component';
import { NewsCategorySelectComponent } from './category/select/categorySelect.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FormsModule } from '@angular/forms';
import { NewsCategoryDeleteComponent } from './category/delete/categoryDelete.component';
import { QuillModule } from 'ngx-quill';
import { NewsContentDeleteComponent } from './content/delete/contentDelete.component';
import { TruncatePipe } from 'app/@cms/cmsCommon/pipe/truncate.pipe';
import { CmsSharedModule } from 'app/@cms/shared/cmsShared.module';
import { NewsCategoryService } from 'app/@cms/cmsService/news/newsCategory.service';
import { NewsCommentService } from 'app/@cms/cmsService/news/newsComment.service';
import { NewsConfigurationService } from 'app/@cms/cmsService/news/newsConfiguration.service';
import { NewsContentService } from 'app/@cms/cmsService/news/newsContent.service';
import { NewsContentAndParameterValueService } from 'app/@cms/cmsService/news/newsContentAndParameterValue.service';
import { NewsContentOtherInfoService } from 'app/@cms/cmsService/news/newsContentOtherInfo.service';
import { NewsContentParameterService } from 'app/@cms/cmsService/news/newsContentParameter.service';
import { NewsContentParameterTypeService } from 'app/@cms/cmsService/news/newsContentParameterType.service';
import { NewsContentSimilarService } from 'app/@cms/cmsService/news/newsContentSimilar.service';
import { NewsContentTagService } from 'app/@cms/cmsService/news/newsContentTag.service';
import { NewsShareMainAdminSettingService } from 'app/@cms/cmsService/news/newsShareMainAdminSetting.service';
import { NewsShareReciverCategoryService } from 'app/@cms/cmsService/news/newsShareReciverCategory.service';
import { NewsShareServerCategoryService } from 'app/@cms/cmsService/news/newsShareServerCategory.service';
import { NewsCategoryTagService } from 'app/@cms/cmsService/news/newsCategoryTag.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NewsRoutes,
    NgxDatatableModule,
    TreeModule.forRoot(),
    // NgxQueryBuilderModule,

    QuillModule,
    CmsSharedModule,
  ],
  declarations: [
    //
    NewsContentAddComponent,
    NewsContentEditComponent,
    NewsContentDeleteComponent,
    NewsContentListComponent,
    NewsContentSelectComponent,
    //
    NewsCategoryAddComponent,
    NewsCategoryEditComponent,
    NewsCategoryDeleteComponent,
    NewsCategoryListComponent,
    NewsCategorySelectComponent,
  ],
  exports: [


  ],
  providers: [
    NewsCategoryService,
    NewsCategoryTagService,
    NewsCommentService,
    NewsConfigurationService,
    NewsContentService,
    NewsContentAndParameterValueService,
    NewsContentOtherInfoService,
    NewsContentParameterService,
    NewsContentParameterTypeService,
    NewsContentSimilarService,
    NewsContentTagService,
    NewsShareMainAdminSettingService,
    NewsShareReciverCategoryService,
    NewsShareServerCategoryService,
  ],
})
export class NewsModule {}
