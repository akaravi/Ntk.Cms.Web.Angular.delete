import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  DatatableComponent,
  ColumnMode,
  TableColumn,
  SelectionType,
} from "@swimlane/ngx-datatable";
import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { ErrorExcptionResult } from "app/@cms/cmsModels/base/errorExcptionResult";
import { FilterModel } from "app/@cms/cmsModels/base/filterModel";
import { SortType } from 'app/@cms/cmsModels/Enums/sortType.enum';
import { SmsMainApiPathCompanyService } from "app/@cms/cmsService/sms/smsMainApiPathCompany.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-sms-main-api-path-company-list",
  templateUrl: "./smsMainApiPathCompanyList.component.html",
  styleUrls: ["./smsMainApiPathCompanyList.component.scss"],
})
export class SmsMainApiPathCompanyListComponent implements OnInit {
  constructor(
    private alertService: ToastrService,
    private publicHelper: PublicHelper,
    private smsMainApiPathCompanyService: SmsMainApiPathCompanyService,
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
    this.DataGetAllContent();
  }
  onSubmitOptionsSearch(model: any) {
    this.filteModelContent.Filters = model;
    this.DataGetAllContent();
  }
  DataGetAllContent() {
    this.tableContentSelected = [];
    this.tableContentloading = true;
    this.smsMainApiPathCompanyService
      .ServiceGetAll(this.filteModelContent)
      .subscribe(
        (next) => {
          if (next.IsSuccess) {
            this.dataModelResult = next;
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
  onActionbuttonNewRow() {
    if (
      this.dataModelResult == null ||
      this.dataModelResult.Access ==null||
      !this.dataModelResult.Access.AccessAddRow
    ) {
      var title="برروز خطا ";
      var message="شما دسترسی برای اضافه کردن ندارید";
      this.alertService.error(message,title);
      return;
    }
    this.openModal(this.contentContentAdd);
  }
  onActionbuttonEditRow() {
    if (
      this.tableContentSelected == null ||
      this.tableContentSelected.length == 0 ||
      this.tableContentSelected[0].Id == 0
    ) {
      var title="برروز خطا ";
      var message="ردیفی برای ویرایش انتخاب نشده است";
      this.alertService.error(message,title);
      return;
    }
    if (
      this.dataModelResult == null ||
      this.dataModelResult.Access==null ||
      !this.dataModelResult.Access.AccessEditRow
    ) {
      var title="برروز خطا ";
      var message="شما دسترسی برای ویرایش ندارید";
      this.alertService.error(message,title);
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
  onActionSelect(event) {
    //your code here
    //console.log("onActionSelect Event", event);
    //console.log("tableContentSelected Event", this.tableContentSelected);
  }
}
