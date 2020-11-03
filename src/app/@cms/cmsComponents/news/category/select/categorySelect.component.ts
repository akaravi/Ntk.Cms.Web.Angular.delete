import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

import { TREE_ACTIONS, ITreeOptions, KEYS } from 'angular-tree-component';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';

import { ComponentOptionNewsCategoryModel } from 'app/@cms/cmsComponentModels/news/componentOptionNewsCategoryModel';
import { CmsToastrService } from 'app/@cms/cmsService/base/cmsToastr.service';
import { ErrorExcptionResult, FilterModel, NewsCategoryModel, NewsCategoryService } from 'ntk-cms-api';

@Component({
  selector: 'app-news-category-select',
  templateUrl: './categorySelect.component.html',
  styleUrls: ['./categorySelect.component.scss'],
})
export class NewsCategorySelectComponent implements OnInit {
  @Input()
  set options(modelInput: ComponentOptionNewsCategoryModel) {

    this.optionsData = modelInput;
  }
  get options(): ComponentOptionNewsCategoryModel {
    return this.optionsData;
  }
  private optionsData: ComponentOptionNewsCategoryModel;
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
        click: (tree, node) => {
          this.onActionSelect(node.data);
        },
      },
      keys: {
        [KEYS.ENTER]: (tree, node) => {
          node.expandAll();
        },
      },
    },
    // nodeHeight: 23,
    allowDrag: () => {
      return false;
    },
    allowDrop: () => {
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
    private toastrService: CmsToastrService,
    private publicHelper: PublicHelper,
    public categoryService: NewsCategoryService
  ) { }

  ngOnInit() {
    this.DataGetAllCategory();

    // this.optionsData.methods = { ActionReload: () => this.onActionReload() }
    this.optionsData.methods = { ActionReload: () => this.onActionReload() };

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
    if (this.optionsData && this.optionsData.actions && this.optionsData.actions.onActionSelect) {
      this.optionsData.actions.onActionSelect(model);
      this.optionsData.data = { SelectId: model.Id, Select: model };
    }

  }
  onActionReload() {
    this.DataGetAllCategory()

  }
}
