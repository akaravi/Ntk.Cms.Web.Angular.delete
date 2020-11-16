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

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewsCategoryDeleteComponent } from './category/delete/categoryDelete.component';
import { QuillModule } from 'ngx-quill';
import { NewsContentDeleteComponent } from './content/delete/contentDelete.component';
import { CmsSharedModule } from 'app/@cms/shared/cmsShared.module';
import {
  NewsCategoryService,
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
import {ArchwizardModule} from 'angular-archwizard';
import {TagInputModule} from 'ngx-chips';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {CommentComponent} from './content/comment/comment.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatCommonModule} from '@angular/material/core';
import {A11yModule, HighContrastModeDetector} from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {AutofillMonitor} from '@angular/cdk/text-field';
import {ContentObserver} from '@angular/cdk/observers';
import {CmsModule} from '../../cms.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NewsRoutes,
    NgxDatatableModule,
    TreeModule.forRoot(),
    QuillModule,
    CmsSharedModule,
    ArchwizardModule,
    ReactiveFormsModule,
    TagInputModule,
    CKEditorModule,
    MatFormFieldModule,
    MatTableModule,
    MatCommonModule,
    MatInputModule,
    MatDialogModule,
    CmsModule
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
    CommentComponent
  ],
  providers: [
    NewsCategoryService,
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
    HighContrastModeDetector,
    Platform,
    AutofillMonitor,
    ContentObserver
  ],
})
export class NewsModule {}
