import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  DatatableComponent,
  ColumnMode,
  TableColumn,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { FilterModel } from 'app/@cms/cmsModels/base/filterModel';
import { SortType } from 'app/@cms/cmsModels/Enums/sortType.enum';
import { SmsMainApiPathCompanyService } from 'app/@cms/cmsService/sms/smsMainApiPathCompany.service';
import { CmsToastrServiceService } from 'app/@cms/cmsService/_base/cmsToastrService.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sms-main-api-path-company-list',
  templateUrl: './smsMainApiPathCompanyList.component.html',
  styleUrls: ['./smsMainApiPathCompanyList.component.scss'],
})
export class SmsMainApiPathCompanyListComponent implements OnInit {
  @ViewChild('contentContentAdd', { static: false })
  contentContentAdd: ElementRef;
  @ViewChild('contentContentEdit', { static: false })
  contentContentEdit: ElementRef;
  optionsSearch: any = {
    onSubmit: (model) => this.onSubmitOptionsSearch(model),
    // AccessSearchField : Array<string>,
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
      prop: 'RecordStatus',
      name: 'وضعیت',
      pipe: { transform: this.publicHelper.RecordStatus },
    },
    {
      prop: 'Id',
      name: 'شناسه',
    },
    {
      prop: 'CreatedDate',
      name: 'ساخت',
      pipe: { transform: this.publicHelper.LocaleDate },
    },
    {
      prop: 'UpdatedDate',
      name: 'ویرایش',
      pipe: { transform: this.publicHelper.LocaleDate },
    },
    {
      prop: 'Title',
      name: 'عنوان',
    },
    {
      prop: 'Description',
      name: 'توضیحات',
    },
  ];
  loadingStatus = false; // add one more property

  closeResult: string;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private toastrService: CmsToastrServiceService,
    private publicHelper: PublicHelper,
    public smsMainApiPathCompanyService: SmsMainApiPathCompanyService,
    private modalService: NgbModal
  ) {}
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
    this.loadingStatus = true;
    this.smsMainApiPathCompanyService
      .ServiceGetAll(this.filteModelContent)
      .subscribe(
        (next) => {
          if (next.IsSuccess) {
            this.dataModelResult = next;
            this.tableContentloading = false;
          }
          this.loadingStatus = false;
        },
        (error) => {
          this.toastrService.toastr.error(
            this.publicHelper.CheckError(error),
            'برروی خطا در دریافت اطلاعات'
          );
          this.tableContentloading = false;
          this.loadingStatus = false;
        }
      );
  }
  onActionbuttonNewRow() {
    if (
      this.dataModelResult == null ||
      this.dataModelResult.Access == null ||
      !this.dataModelResult.Access.AccessAddRow
    ) {
      const title = 'برروز خطا ';
      const message = 'شما دسترسی برای اضافه کردن ندارید';
      this.toastrService.toastr.error(message, title);
      return;
    }
    this.openModal(this.contentContentAdd);
  }
  onActionbuttonEditRow() {
    if (
      this.tableContentSelected == null ||
      this.tableContentSelected.length === 0 ||
      this.tableContentSelected[0].Id === 0
    ) {
      const title = 'برروز خطا ';
      const message = 'ردیفی برای ویرایش انتخاب نشده است';
      this.toastrService.toastr.error(message, title);
      return;
    }
    if (
      this.dataModelResult == null ||
      this.dataModelResult.Access == null ||
      !this.dataModelResult.Access.AccessEditRow
    ) {
      const title = 'برروز خطا ';
      const message = 'شما دسترسی برای ویرایش ندارید';
      this.toastrService.toastr.error(message, title);
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
  // Open default modal
  openModal(content) {
    this.modalService.open(content).result.then(
      (result) => {
        this.closeResult = `بسته شدن با: ${result}`;
        this.DataGetAllContent();
      },
      (reason) => {
        this.closeResult = `رها شدن با ${this.getDismissReason(reason)}`;
        this.DataGetAllContent();
      }
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'با فشردن ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'با کلیک کردن یک backdrop';
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
      if (sort.dir === 'desc') {
        this.filteModelContent.SortType = SortType.Descending;
      } else {
        this.filteModelContent.SortType = SortType.Ascending;
      }
      this.filteModelContent.SortColumn = sort.prop;
    }
    this.DataGetAllContent();
  }
  onActionSelect(event) {
    // your code here
    // console.log("onActionSelect Event", event);
    // console.log("tableContentSelected Event", this.tableContentSelected);
  }
}
