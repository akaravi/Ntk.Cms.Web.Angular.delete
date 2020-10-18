import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import {
  FilterModel,
  FilterDataModel,
} from "app/@cms/cmsModels/base/filterModel";
import { ErrorExcptionResult } from "app/@cms/cmsModels/base/errorExcptionResult";
import { ToastrService } from "ngx-toastr";
import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { NewsContentService } from "app/@cms/cmsService/news/newsContent.service";

import {
  DatatableComponent,
  ColumnMode,
  TableColumn,
  SelectionType,
} from "@swimlane/ngx-datatable";
import {
  TREE_ACTIONS,
  KEYS,
  IActionMapping,
  ITreeOptions,
} from "angular-tree-component";
import { SortType } from "app/@cms/cmsModels/Enums/sortType.enum";
import { PersianCalendarService } from "app/@cms/cmsCommon/pipe/PersianDatePipe/persian-date.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ComponentOptionModel } from "app/@cms/cmsModels/base/componentOptionModel";

@Component({
  selector: "app-news-content-List",
  templateUrl: "./contentList.component.html",
  styleUrls: ["./contentList.component.scss"],
})
export class NewsContentListComponent implements OnInit {
  constructor(
    private alertService: ToastrService,
    private publicHelper: PublicHelper,
    private contentService: NewsContentService,
    private modalService: NgbModal
  ) {}
  @ViewChild("contentContentAdd", { static: false })
  contentContentAdd: ElementRef;
  ngOnInit() {
    this.optionsCategorySelect.actions = {
      onActionSelect: (x) => this.onActionCategorySelect(x),
    };

    this.DataViewModelContent();
    this.DataGetAllContent();
  }
  filteModelContent = new FilterModel();
  filteModelCategory = new FilterModel();
  dataResultContent: ErrorExcptionResult<any> = new ErrorExcptionResult<any>();
  dataResultCategory: ErrorExcptionResult<any> = new ErrorExcptionResult<any>();
  dataResultContentViewModel: ErrorExcptionResult<
    any
  > = new ErrorExcptionResult<any>();
  // Table Column Titles
  columnMode = ColumnMode;
  selectionType = SelectionType;
  optionsSearch: any = {
    onSubmit: (model) => this.onSubmitOptionsSearch(model),
    //AccessSearchField : Array<string>,
  };
  tableContentloading = false;
  tableContentSelected: Array<any> = [];

  columnsContent: TableColumn[] = [
    {
      prop: "Id",
      name: "شناسه",
    },
    {
      prop: "CreatedDate",
      name: "ساخت",
      pipe: { transform: this.publicHelper.LocaleDate },
    },
    {
      prop: "UpdatedDate",
      name: "ویرایش",
      pipe: { transform: this.publicHelper.LocaleDate },
    },
    {
      prop: "Title",
      name: "عنوان",
    },
    {
      prop: "Description",
      name: "توضیحات",
    },
  ];

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
          this.onActionCategorySelect(node);
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
  optionsCategorySelect: ComponentOptionModel = new ComponentOptionModel();
  optionsCategorySelectData: any;

  // LocaleDate(model) {
  //   const d = new Date(model);
  //   return d.toLocaleDateString("fa-Ir");
  // }

  closeResult: string;
  // Open default modal
  openModal(content) {
    this.modalService.open(content).result.then(
      (result) => {
        this.closeResult = `بسته شدن با: ${result}`;
        this.onActionCategoryReload();
      },
      (reason) => {
        this.closeResult = `رها شدن با ${this.getDismissReason(reason)}`;
        this.onActionCategoryReload();
      }
    );
  }
  onActionCategoryReload() {
    this.optionsCategorySelect.methods.ActionReload();
  }
  // This function is used in open
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "با فشردن ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "با کلیک کردن یک backdrop";
    } else {
      return `با: ${reason}`;
    }
  }

  DataViewModelContent() {
    this.contentService.ServiceViewModel().subscribe(
      (next) => {
        if (next.IsSuccess) {
          this.dataResultContentViewModel = next;
          this.optionsSearch.setAccess(next.Access);
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

  DataGetAllContent() {
    this.tableContentSelected = [];
    this.tableContentloading = true;
    this.contentService.ServiceGetAll(this.filteModelContent).subscribe(
      (next) => {
        if (next.IsSuccess) {
          this.dataResultContent = next;
          this.tableContentloading = false;
        }
      },
      (error) => {
        this.alertService.error(
          this.publicHelper.CheckError(error),
          "برروی خطا در دریافت اطلاعات"
        );
        this.tableContentloading = false;
      }
    );
  }
  // DataGetAllCategory() {
  //   this.categoryService.ServiceGetAll(this.filteModelCategory).subscribe(
  //     (next) => {
  //       if (next.IsSuccess) {
  //         this.dataResultCategory = next;
  //       }
  //     },
  //     (error) => {
  //       this.alertService.error(
  //         this.publicHelper.CheckError(error),
  //         "برروی خطا در دریافت اطلاعات"
  //       );
  //     }
  //   );
  // }
  onActionCategorySelect(model: any) {
    this.filteModelContent = new FilterModel();
    this.optionsCategorySelectData = null;
    if (model && model.data) {
      this.optionsCategorySelectData = model.data;

      var aaa = {
        PropertyName: "LinkCategoryId",
        IntValue1: model.data.Id,
      };
      this.filteModelContent.Filters.push(aaa as FilterDataModel);
    }
    this.DataGetAllContent();
  }
  onActionSetPage(model: any) {
    this.filteModelContent.CurrentPageNumber = model.offset + 1;
    this.DataGetAllContent();
  }
  onActionSort(event) {
    const sort = event.sorts[0];

    if (sort) {
      if (sort.dir === "desc") {
        this.filteModelContent.SortType = SortType.Descending;
      } else {
        this.filteModelContent.SortType = SortType.Ascending;
      }
      this.filteModelContent.SortColumn = sort.prop;
    }
    this.DataGetAllContent();
  }
  onActionSelect(event) {
    //your code here
    console.log("onActionSelect Event", event);
    console.log("tableContentSelected Event", this.tableContentSelected);
  }
  private modals: any[] = [];

  onActionbuttonNewRow() {
    if (this.dataResultContent!=null&& this.dataResultContent.Access&& this.dataResultContent.Access.AccessAddRow &&
      this.optionsCategorySelectData!=null
    ) {
      this.openModal(this.contentContentAdd);
    } else {
      this.alertService.error(
        "دسته بندی انتخاب نشده است",
        "برروی خطا "
      );
    }
  }
  onActionbuttonEditRow() {}
  onActionbuttonDeleteRow() {}
  onActionbuttonStatus() {}
  onActionbuttonExport() {}

  onActionbuttonReload() {
    this.DataGetAllContent();
  }
  onSubmitOptionsSearch(model: any) {
    this.filteModelContent.Filters = model;
    this.DataGetAllContent();
  }
}
