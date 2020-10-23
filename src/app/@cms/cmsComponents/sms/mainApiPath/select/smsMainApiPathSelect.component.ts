import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import {
  FilterModel,
  FilterDataModel,
} from 'app/@cms/cmsModels/base/filterModel';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { TREE_ACTIONS, ITreeOptions, KEYS } from 'angular-tree-component';
import { ToastrService } from 'ngx-toastr';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';

import { ComponentOptionModel } from 'app/@cms/cmsModels/base/componentOptionModel';
import { SmsMainApiPathService } from 'app/@cms/cmsService/sms/smsMainApiPath.service';
import { CmsToastrServiceService } from 'app/@cms/cmsService/_base/cmsToastrService.service';
import { ComponentOptionSmsMainApiPathModel } from 'app/@cms/cmsComponentModels/sms/componentOptionSmsMainApiPathModel';
import { SmsMainApiPathModel } from 'app/@cms/cmsModels/sms/smsMainApiPathModel';

@Component({
  selector: 'app-sms-main-api-path-select',
  templateUrl: './smsMainApiPathSelect.component.html',
  styleUrls: ['./smsMainApiPathSelect.component.scss'],
})
export class SmsMainApiPathSelectComponent implements OnInit {
  @Input()
  set options(model: ComponentOptionSmsMainApiPathModel) {
    this.privateOptions = model;
  }
  get options(): ComponentOptionSmsMainApiPathModel {
    return this.privateOptions;
  }
  private privateOptions: ComponentOptionSmsMainApiPathModel = new ComponentOptionSmsMainApiPathModel();
  loadingStatus = false; // add one more property


  filteModelCategory = new FilterModel();
  dataModelCategory: ErrorExcptionResult<any> = new ErrorExcptionResult<any>();
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
    public categoryService: SmsMainApiPathService
  ) { }

  ngOnInit() {
    this.DataGetAllCategory();

    this.privateOptions.methods = { ActionReload: () => this.onActionReload() };
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
  onActionSelect(model: SmsMainApiPathModel) {
    if (
      this.privateOptions &&
      this.privateOptions.actions &&
      this.privateOptions.actions.onActionSelect
    ) {
      this.privateOptions.actions.onActionSelect(model);
      this.privateOptions.data = { Select: model, SelectId: model.Id };
    }
  }
  onActionReload() {
    this.DataGetAllCategory();
  }
}
