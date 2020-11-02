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
import { CmsSharedModule } from 'app/@cms/shared/cmsShared.module';
import {
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
  CoreEnumService,
} from 'ntk-cms-api';

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
  exports: [],
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
    CoreEnumService
  ],
})
export class NewsModule {}
