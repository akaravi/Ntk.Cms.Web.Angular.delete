import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { FormInfoModel } from "app/@cms/cmsModels/base/formInfoModel";
import { ItemState } from "app/@cms/cmsModels/base/itemState";
import { NewsContentModel } from "app/@cms/cmsModels/news/newsContentModel";
import { CoreEnumService } from "app/@cms/cmsService/core/coreEnum.service";
import { NewsContentService } from "app/@cms/cmsService/news/newsContent.service";
import { CmsToastrServiceService } from "app/@cms/cmsService/_base/cmsToastrService.service";
import {
  ColumnMode,
  TableColumn,
  SelectionType,
} from "@swimlane/ngx-datatable";
@Component({
  selector: "app-news-content-delete",
  templateUrl: "./contentDelete.component.html",
  styleUrls: ["./contentDelete.component.scss"],
})
export class NewsContentDeleteComponent implements OnInit {
  @ViewChild("vform", { static: false })
  formGroup: FormGroup;
  @Input()
  set options(model: any) {
    this.dateModleInput = model;
  }
  get options(): any {
    return this.dateModleInput;
  }
  private dateModleInput: any;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public newsContentService: NewsContentService,
    public coreEnumService: CoreEnumService,
    private toastrService: CmsToastrServiceService,
    private publicHelper: PublicHelper
  ) {}
  dataModelContents: Array<NewsContentModel> = new Array<NewsContentModel>();
  dataModelItemStates: Array<ItemState<NewsContentModel>> = new Array<
    ItemState<NewsContentModel>
  >();
  formInfo: FormInfoModel = new FormInfoModel();
  selectionType = SelectionType;
  tableContentloading = false;
  tableContentSelected: Array<NewsContentModel> = [];
  columnMode = ColumnMode;
  columnsContent: TableColumn[] = [
    {
      prop: "Item.Id",
      name: "شناسه",
    },
    {
      prop: "Item.Title",
      name: "عنوان",
    },
    {
      prop: "ActionStart",
      name: "Action Start",
    },
    {
      prop: "ActionEnd",
      name: "Action End",
    },
    {
      prop: "Status",
      name: "Status",
    },
    {
      prop: "Message",
      name: "Message",
    },
  ];
  ngOnInit() {
    if (this.dateModleInput && this.dateModleInput.Contents) {
      this.dataModelContents = this.dateModleInput.Contents;
    }

    this.DataGetListContent();
  }
  DataGetListContent() {
    if (this.dataModelContents == null || this.dataModelContents.length == 0) {
      var title = "برروز خطا ";
      var message = "ردیف اطلاعات جهت حذف مشخص نیست";
      this.toastrService.toastr.error(message, title);
      return;
    }

    this.formInfo.formAlert = "در دریافت ارسال اطلاعات از سرور";
    this.formInfo.formError = "";
    this.dataModelContents.forEach((element) => {
      this.dataModelItemStates.push({
        ActionStart: false,
        ActionEnd: false,
        Item: element,
        Status: "",
        Message: "",
      });
    });
  }
  DataDeleteContent() {
    if (this.dataModelContents == null || this.dataModelContents.length == 0) {
      var title = "برروز خطا ";
      var message = "ردیف اطلاعات جهت حذف مشخص نیست";
      this.toastrService.toastr.error(message, title);
      return;
    }

    //this.formInfo.formAlert = "در حال ارسال اطلاعات به سرور";
    this.formInfo.formError = "";
    this.formInfo.formAllowSubmit = false;
    this.dataModelItemStates.forEach((element) => {
      //
      element.ActionStart = true;
      this.newsContentService.ServiceDelete(element.Item.Id).subscribe(
        (next) => {
          // this.formInfo.formAllowSubmit = true;
          // this.dataModelResult = next;
          element.ActionEnd = true;
          if (next.IsSuccess) {
            element.Message = "حذف شد";
            element.Status = "Ok";
          } else {
            element.Message = next.ErrorMessage;
            element.Status = "Error";
          }
        },
        (error) => {
          element.ActionEnd = true;
          //this.formInfo.formAllowSubmit = true;
          var title = "برروی خطا در دریافت اطلاعات";
          var message = this.publicHelper.CheckError(error);
          element.Message = title + " : " + message;
          element.Status = "Error";
        }
      );

      //
    });
  }
  onFormCancel() {
    this.formGroup.reset();
  }
}
