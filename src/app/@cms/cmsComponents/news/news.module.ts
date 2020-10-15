import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutes } from './news.routing';
import { TreeModule } from 'angular-tree-component';
import { NewsContentAddComponent } from './content/add/ContentAdd.component';
import { NewsContentListComponent } from './content/list/contentList.component';
import { NewsContentEditComponent } from './content/edit/ContentEdit.component';
import { NewsContentSelectComponent } from './content/select/contentSelect.component';
import { NewsCategoryAddComponent } from './category/add/categoryAdd.component';
import { NewsCategoryEditComponent } from './category/edit/categoryEdit.component';
import { NewsCategoryListComponent } from './category/list/categoryList.component';
import { NewsCategorySelectComponent } from './category/select/categorySelect.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CmsSearchContentListComponent } from '../_base/cmsSearchContentList/cmsSearchContentList.component';
import { NgxQueryBuilderModule } from 'ngx-query-builder';
import { FormsModule } from '@angular/forms';
import { NewsCategoryDeleteComponent } from './category/delete/categoryDelete.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NewsRoutes,
    NgxDatatableModule,
    TreeModule.forRoot(),
    NgxQueryBuilderModule,

    QuillModule
  ],
  declarations: [
    NewsContentAddComponent,
    NewsContentEditComponent,
    NewsContentListComponent,
    NewsContentSelectComponent,
//
    NewsCategoryAddComponent,
    NewsCategoryEditComponent,
    NewsCategoryDeleteComponent,
    NewsCategoryListComponent,
    NewsCategorySelectComponent,
    CmsSearchContentListComponent,
    
    
  ]  ,
  exports:[
   ]
   //,schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class NewsModule { }
