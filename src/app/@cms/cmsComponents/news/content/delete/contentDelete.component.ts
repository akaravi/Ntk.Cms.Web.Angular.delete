import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';
import { CmsToastrServiceService } from 'app/@cms/cmsService/base/cmsToastrService.service';
import { CoreEnumService, FormInfoModel, ItemState, NewsContentModel, NewsContentService } from 'ntk-cms-api';


@Component({
  selector: 'app-news-content-delete',
  templateUrl: './contentDelete.component.html',
  styleUrls: ['./contentDelete.component.scss'],
})
export class NewsContentDeleteComponent implements OnInit {
  @Input()
  set options(model: any) {
    this.dateModleInput = model;
  }
  get options(): any {
    return this.dateModleInput;
  }
  @ViewChild('vform', { static: false })
  formGroup: FormGroup;
  private dateModleInput: any;
  dataModelContents: Array<NewsContentModel> = new Array<NewsContentModel>();
  dataModelItemStates: Array<ItemState<NewsContentModel>> = new Array<
    ItemState<NewsContentModel>
  >();
  formInfo: FormInfoModel = new FormInfoModel();
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public newsContentService: NewsContentService,
    public coreEnumService: CoreEnumService,
    private toastrService: CmsToastrServiceService,
    private publicHelper: PublicHelper
  ) {}

  ngOnInit() {
    if (this.dateModleInput && this.dateModleInput.Contents) {
      this.dataModelContents = this.dateModleInput.Contents;
    }

    this.DataGetListContent();
  }
  DataGetListContent() {
    if (this.dataModelContents == null || this.dataModelContents.length === 0) {
      const title = 'برروز خطا ';
      const message = 'ردیف اطلاعات جهت حذف مشخص نیست';
      this.toastrService.toastr.error(message, title);
      return;
    }

    this.formInfo.formError = '';
    this.dataModelContents.forEach((element) => {
      this.dataModelItemStates.push({
        ActionStart: false,
        ActionEnd: false,
        Item: element,
        Status: '',
        Message: '',
      });
    });
  }
  DataDeleteContent() {
    if (this.dataModelContents == null || this.dataModelContents.length === 0) {
      const title = 'برروز خطا ';
      const message = 'ردیف اطلاعات جهت حذف مشخص نیست';
      this.toastrService.toastr.error(message, title);
      return;
    }

    this.formInfo.formError = '';
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
            element.Message = 'حذف شد';
            element.Status = 'Ok';
          } else {
            element.Message = next.ErrorMessage;
            element.Status = 'Error';
          }
        },
        (error) => {
          element.ActionEnd = true;
          // this.formInfo.formAllowSubmit = true;
          const title = 'برروی خطا در دریافت اطلاعات';
          const message = this.publicHelper.CheckError(error);
          element.Message = title + ' : ' + message;
          element.Status = 'Error';
        }
      );

      //
    });
  }
  onFormCancel() {
    this.formGroup.reset();
  }
}
