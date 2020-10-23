import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import {
  FilterModel,
  FilterDataModel,
} from 'app/@cms/cmsModels/base/filterModel';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { TREE_ACTIONS, ITreeOptions, KEYS } from 'angular-tree-component';
import { ToastrService } from 'ngx-toastr';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';
import { NewsCategoryService } from 'app/@cms/cmsService/news/newsCategory.service';
import { ComponentOptionModel } from 'app/@cms/cmsModels/base/componentOptionModel';
import { NewsCategoryModel } from 'app/@cms/cmsModels/news/newsCategoryModel';
import { CmsToastrServiceService } from 'app/@cms/cmsService/_base/cmsToastrService.service';
import { ComponentOptionNewsCategoryModel } from 'app/@cms/cmsComponentModels/news/componentOptionNewsCategoryModel';

@Component({
  selector: 'app-news-category-select',
  templateUrl: './categorySelect.component.html',
  styleUrls: ['./categorySelect.component.scss'],
})
export class NewsCategorySelectComponent implements OnInit {
  @Input()
  set options(modelInput: ComponentOptionNewsCategoryModel) {

    this.privateOptions = modelInput;
  }
  get options(): ComponentOptionNewsCategoryModel {
    return this.privateOptions;
  }
  private privateOptions: ComponentOptionNewsCategoryModel;
  loadingStatus = false; // add one more property


  filteModelCategory = new FilterModel();
  dataModelCategory: ErrorExcptionResult<NewsCategoryModel> = new ErrorExcptionResult<NewsCategoryModel>();
  optionsModelTree: ITreeOptions = {
    idField: 'id',
    displayField: 'Title',
    childrenField: 'Children',
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          if (node.hasChildren) {
            TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
          }
        },
        click: (tree, node, $event) => {
          this.onActionSelect(node.data);
        },
      },
      keys: {
        [KEYS.ENTER]: (tree, node, $event) => {
          node.expandAll();
        },
      },
    },
    // nodeHeight: 23,
    allowDrag: (node) => {
      return false;
    },
    allowDrop: (node) => {
      return false;
    },
    allowDragoverStyling: true,
    levelPadding: 10,
    // useVirtualScroll: true,
    animateExpand: true,
    scrollOnActivate: true,
    animateSpeed: 30,
    animateAcceleration: 1.2,
    // scrollContainer: document.documentElement, // HTML
    rtl: true,
  };

  constructor(
    private changeDetectorRef: ChangeDetectorRef,

    private toastrService: CmsToastrServiceService,
    private publicHelper: PublicHelper,
    public categoryService: NewsCategoryService
  ) { }

  ngOnInit() {
    this.DataGetAllCategory();

    // this.privateOptions.methods = { ActionReload: () => this.onActionReload() }
    this.privateOptions.methods = { ActionReload : () => this.onActionReload() };

  }

  DataGetAllCategory() {
    this.filteModelCategory.RowPerPage = 200;
    this.loadingStatus = true;
    this.categoryService.ServiceGetAll(this.filteModelCategory).subscribe(
      (next) => {
        if (next.IsSuccess) {
          this.dataModelCategory = next;
        }
        this.loadingStatus = false;
      },
      (error) => {
        this.toastrService.toastr.error(
          this.publicHelper.CheckError(error),
          'برروی خطا در دریافت اطلاعات'
        );
        this.loadingStatus = false;
      }
    );
  }
  onActionSelect(model: NewsCategoryModel) {
    if (this.privateOptions && this.privateOptions.actions && this.privateOptions.actions.onActionSelect) {
      this.privateOptions.actions.onActionSelect(model);
      this.privateOptions.data = { SelectId: model.Id, Select: model };
    }

  }
  onActionReload() {
    this.DataGetAllCategory()

  }
}
