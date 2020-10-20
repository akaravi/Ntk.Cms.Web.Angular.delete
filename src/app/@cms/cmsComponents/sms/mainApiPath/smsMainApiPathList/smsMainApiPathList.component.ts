import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  DatatableComponent,
  ColumnMode,
  TableColumn,
  SelectionType,
} from "@swimlane/ngx-datatable";
import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { ComponentOptionModel } from 'app/@cms/cmsModels/base/componentOptionModel';
import { ErrorExcptionResult } from "app/@cms/cmsModels/base/errorExcptionResult";
import { FilterDataModel, FilterModel } from "app/@cms/cmsModels/base/filterModel";
import { SortType } from 'app/@cms/cmsModels/Enums/sortType.enum';
import { SmsMainApiPathService } from "app/@cms/cmsService/sms/smsMainApiPath.service";
import { CmsToastrServiceService } from 'app/@cms/cmsService/_base/cmsToastrService.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-sms-main-api-path-list",
  templateUrl: "./smsMainApiPathList.component.html",
  styleUrls: ["./smsMainApiPathList.component.scss"],
})
export class SmsMainApiPathListComponent implements OnInit {
  constructor(
    private toastrService: CmsToastrServiceService,
    private publicHelper: PublicHelper,
    public smsMainApiPathService: SmsMainApiPathService,
    private modalService: NgbModal
  ) {}
  @ViewChild("contentContentAdd", { static: false })
  contentContentAdd: ElementRef;
  @ViewChild("contentContentEdit", { static: false })
  contentContentEdit: ElementRef;
  optionsSearch: any = {
    onSubmit: (model) => this.onSubmitOptionsSearch(model),
    //AccessSearchField : Array<string>,
  };
  optionsCategorySelect: ComponentOptionModel = new ComponentOptionModel();
  optionsCategorySelectData: any;
  filteModelContent = new FilterModel();
  tableContentloading = false;
  tableContentSelected: Array<any> = [];
  dataModelResult: ErrorExcptionResult<any> = new ErrorExcptionResult<any>();
  dataModelResultViewModel: ErrorExcptionResult<
    any
  > = new ErrorExcptionResult<any>();
  columnMode = ColumnMode;
  selectionType = SelectionType;
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
  ngOnInit() {
    this.optionsCategorySelect.actions = {
      onActionSelect: (x) => this.onActionCategorySelect(x),
    };

    this.DataViewModelContent();
    this.DataGetAllContent();
  }
  onSubmitOptionsSearch(model: any) {
    this.filteModelContent.Filters = model;
    this.DataGetAllContent();
  }
  DataGetAllContent() {
    this.tableContentSelected = [];
    this.tableContentloading = true;
    this.smsMainApiPathService
      .ServiceGetAll(this.filteModelContent)
      .subscribe(
        (next) => {
          if (next.IsSuccess) {
            this.dataModelResult = next;
            this.tableContentloading = false;
          }
        },
        (error) => {
          this.toastrService.toastr.error(
            this.publicHelper.CheckError(error),
            "برروی خطا در دریافت اطلاعات"
          );
          this.tableContentloading = false;
        }
      );
  }
  onActionbuttonNewRow() {
    if (
      this.dataModelResult != null &&
      this.dataModelResult.Access &&
      this.dataModelResult.Access.AccessAddRow
    ) {
      this.openModal(this.contentContentAdd);
    } else {
      this.toastrService.toastr.error("خطا", "برروی خطا ");
    }
  }
  onActionbuttonEditRow() {
    if (
      this.tableContentSelected == null ||
      this.tableContentSelected.length == 0 ||
      this.tableContentSelected[0].Id == 0
    ) {
      var title="برروز خطا ";
      var message="ردیفی برای ویرایش انتخاب نشده است";
      this.toastrService.toastr.error(message,title);
      return;
    }
    if (
      this.dataModelResult == null ||
      this.dataModelResult.Access==null ||
      !this.dataModelResult.Access.AccessEditRow
    ) {
      var title="برروز خطا ";
      var message="شما دسترسی برای ویرایش ندارید";
      this.toastrService.toastr.error(message,title);
      return;
    }
    this.openModal(this.contentContentEdit);
  }
  onActionbuttonDeleteRow() {}
  onActionbuttonStatus() {}
  onActionbuttonExport() {}

  onActionbuttonReload() {
    this.DataGetAllContent();
  }

  closeResult: string;
  // Open default modal
  openModal(content) {
    this.modalService.open(content).result.then(
      (result) => {
        this.closeResult = `بسته شدن با: ${result}`;
        //this.onActionCategoryReload();
      },
      (reason) => {
        this.closeResult = `رها شدن با ${this.getDismissReason(reason)}`;
        //this.onActionCategoryReload();
      }
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "با فشردن ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "با کلیک کردن یک backdrop";
    } else {
      return `با: ${reason}`;
    }
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
  onActionCategorySelect(model: any) {
    this.filteModelContent = new FilterModel();
    this.optionsCategorySelectData = null;
    if (model && model.data) {
      this.optionsCategorySelectData = model.data;

      var aaa = {
        PropertyName: "LinkApiPathCompanyId",
        IntValue1: model.data.Id,
      };
      this.filteModelContent.Filters.push(aaa as FilterDataModel);
    }
    this.DataGetAllContent();
  }
  
  DataViewModelContent() {
    this.smsMainApiPathService.ServiceViewModel().subscribe(
      (next) => {
        if (next.IsSuccess) {
          this.dataModelResultViewModel = next;
          this.optionsSearch.setAccess(next.Access);
        }
      },
      (error) => {
        this.toastrService.toastr.error(
          this.publicHelper.CheckError(error),
          "برروی خطا در دریافت اطلاعات"
        );
      }
    );
  }
  onActionSelect(event) {
    //your code here
    //console.log("onActionSelect Event", event);
    //console.log("tableContentSelected Event", this.tableContentSelected);
  }
}
