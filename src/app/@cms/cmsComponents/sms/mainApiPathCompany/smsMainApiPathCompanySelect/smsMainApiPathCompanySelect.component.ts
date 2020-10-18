import { Component, OnInit, Input } from "@angular/core";
import {
  FilterModel,
  FilterDataModel,
} from "app/@cms/cmsModels/base/filterModel";
import { ErrorExcptionResult } from "app/@cms/cmsModels/base/errorExcptionResult";
import { TREE_ACTIONS, ITreeOptions, KEYS } from "angular-tree-component";
import { ToastrService } from "ngx-toastr";
import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { NewsCategoryService } from "app/@cms/cmsService/news/newsCategory.service";
import { ComponentOptionModel } from "app/@cms/cmsModels/base/componentOptionModel";

@Component({
  selector: 'app-sms-main-api-path-company-select',
  templateUrl: './smsMainApiPathCompanySelect.component.html',
  styleUrls: ['./smsMainApiPathCompanySelect.component.scss']
})
export class SmsMainApiPathCompanySelectComponent implements OnInit {
  constructor(
    private alertService: ToastrService,
    private publicHelper: PublicHelper,
    private categoryService: NewsCategoryService
  ) {}

  ngOnInit() {
    this.DataGetAllCategory();
    
    this.dateModleInput.methods={ActionReload: () => this.onActionReload()}
    
  }
  @Input()
  set options(modelInput: ComponentOptionModel) {
    this.dateModleInput = modelInput;  
  }
  get options(): ComponentOptionModel {
    return this.dateModleInput;
  }
  private dateModleInput: ComponentOptionModel=new ComponentOptionModel();
  

  filteModelCategory = new FilterModel();
  dataModelCategory: ErrorExcptionResult<any> = new ErrorExcptionResult<any>();
  optionsModelTree: ITreeOptions = {
    idField: "id",
    displayField: "Title",
    childrenField: "Children",
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          if (node.hasChildren)
            TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
        },
        click: (tree, node, $event) => {
          this.onActionSelect(node);
        },
      },
      keys: {
        [KEYS.ENTER]: (tree, node, $event) => {
          node.expandAll();
        },
      },
    },
    //nodeHeight: 23,
    allowDrag: (node) => {
      return false;
    },
    allowDrop: (node) => {
      return false;
    },
    allowDragoverStyling: true,
    levelPadding: 10,
    //useVirtualScroll: true,
    animateExpand: true,
    scrollOnActivate: true,
    animateSpeed: 30,
    animateAcceleration: 1.2,
    //scrollContainer: document.documentElement, // HTML
    rtl: true,
  };
  
  DataGetAllCategory() {
    this.filteModelCategory.RowPerPage = 200;
    this.categoryService.ServiceGetAll(this.filteModelCategory).subscribe(
      (next) => {
        if (next.IsSuccess) {
          this.dataModelCategory = next;
        }
      },
      (error) => {
        this.alertService.error(
          this.publicHelper.CheckError(error),
          "برروی خطا در دریافت اطلاعات"
        );
      }
    );
  }
  onActionSelect(model: any) {
    if (this.dateModleInput && this.dateModleInput.actions && this.dateModleInput.actions.onActionSelect) {
      this.dateModleInput.actions.onActionSelect(model);
      this.dateModleInput.dataModel={Select:model};
    }
    // this.filteModelContent = new FilterModel();
    // if (model && model.data) {
    //   var aaa = {
    //     PropertyName: "LinkCategoryId",
    //     IntValue1: model.data.Id,
    //   };
    //   this.filteModelContent.Filters.push(aaa as FilterDataModel);
    // }
    // this.DataGetAllContent();
  }
  onActionReload(){
    this.DataGetAllCategory()

  }
}