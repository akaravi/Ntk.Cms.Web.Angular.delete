import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FilterModel,
  FilterDataModel,
} from 'app/@cms/cmsModels/base/filterModel';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';
import { NewsContentService } from 'app/@cms/cmsService/news/newsContent.service';

import {
  ColumnMode,
  TableColumn,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { TREE_ACTIONS, KEYS, ITreeOptions } from 'angular-tree-component';
import { SortType } from 'app/@cms/cmsModels/Enums/sortType.enum';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ComponentOptionModel } from 'app/@cms/cmsModels/base/componentOptionModel';
import { NewsContentModel } from 'app/@cms/cmsModels/news/newsContentModel';
import { NewsCategoryModel } from 'app/@cms/cmsModels/news/newsCategoryModel';
import { CmsToastrServiceService } from 'app/@cms/cmsService/_base/cmsToastrService.service';
import { BaseComponent } from 'app/@cms/cmsComponents/_base/baseComponent';
import { ComponentModalDataModel } from 'app/@cms/cmsModels/base/componentModalModel';
import { ComponentOptionNewsCategoryModel } from 'app/@cms/cmsComponentModels/news/componentOptionNewsCategoryModel';

@Component({
  selector: 'app-news-content-list',
  templateUrl: './contentList.component.html',
  styleUrls: ['./contentList.component.scss'],
})
export class NewsContentListComponent extends BaseComponent implements OnInit {
  @ViewChild('contentModal', { static: false })
  contentModal: ElementRef;
  // @ViewChild('contentContentAdd', { static: false })
  // contentContentAdd: ElementRef;
  // @ViewChild('contentContentEdit', { static: false })
  // contentContentEdit: ElementRef;
  // @ViewChild('contentContentDelete', { static: false })
  // contentContentDelete: ElementRef;
  loadingStatus = false; // add one more property


  filteModelContent = new FilterModel();
  filteModelCategory = new FilterModel();
  dataModelResult: ErrorExcptionResult<any> = new ErrorExcptionResult<any>();
  dataModelResultCategory: ErrorExcptionResult<any> = new ErrorExcptionResult<
    any
  >();
  dataModelResultViewModel: ErrorExcptionResult<any> = new ErrorExcptionResult<
    any
  >();
  // Table Column Titles
  columnMode = ColumnMode;
  selectionType = SelectionType;
  optionsSearch: any = {
    onSubmit: (model) => this.onSubmitOptionsSearch(model),
    // AccessSearchField : Array<string>,
  };
  tableContentloading = false;
  tableContentSelected: Array<NewsContentModel> = [];
  modalModel: ComponentModalDataModel = new ComponentModalDataModel();
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
      prop: 'LinkSiteId',
      name: 'سایت',
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
      pipe: { transform: this.publicHelper.Truncate },
    },
    {
      prop: 'Description',
      name: 'توضیحات',
      pipe: { transform: this.publicHelper.Truncate },
    },
  ];

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
          this.onActionCategorySelect(node);
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
  optionsCategorySelect: ComponentOptionNewsCategoryModel = new ComponentOptionNewsCategoryModel();


  closeResult: string;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    toastrService: CmsToastrServiceService,
    publicHelper: PublicHelper,
    modalService: NgbModal,
    public contentService: NewsContentService,


  ) {
    super(toastrService, publicHelper, modalService);
  }

  ngOnInit() {
    // this.optionsCategorySelect.actions = {
    //   onActionSelect: (x) => this.onActionCategorySelect(x),
    // };
    this.optionsCategorySelect.actions = { onActionSelect: (x) => this.onActionCategorySelect(x) };

    this.DataViewModelContent();
    this.DataGetAllContent();
  }
  // Open default modal
  openModal(content, contentModal: ComponentModalDataModel) {
    this.modalModel = contentModal;
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
      return 'با فشردن ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'با کلیک کردن یک backdrop';
    } else {
      return `با: ${reason}`;
    }
  }

  DataViewModelContent() {
    this.loadingStatus = true;
    this.contentService.ServiceViewModel().subscribe(
      (next) => {
        if (next.IsSuccess) {
          this.dataModelResultViewModel = next;
          this.optionsSearch.setAccess(next.Access);
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

  DataGetAllContent() {
    this.tableContentSelected = [];
    this.tableContentloading = true;
    this.loadingStatus = true;
    this.contentService.ServiceGetAll(this.filteModelContent).subscribe(
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

  onActionCategorySelect(model: NewsCategoryModel) {
    this.filteModelContent = new FilterModel();

    if (model && model.Id > 0) {
      const aaa = {
        PropertyName: 'LinkCategoryId',
        IntValue1: model.Id,
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
      if (sort.dir === 'desc') {
        this.filteModelContent.SortType = SortType.Descending;
      } else {
        this.filteModelContent.SortType = SortType.Ascending;
      }
      this.filteModelContent.SortColumn = sort.prop;
    }
    this.DataGetAllContent();
  }
  onActionSelect() {
    // your code here
    // console.log("onActionSelect Event", event);
    // console.log("tableContentSelected Event", this.tableContentSelected);
  }

  onActionbuttonNewRow() {
    if (
      this.optionsCategorySelect == null ||
      this.optionsCategorySelect.data == null ||
      this.optionsCategorySelect.data.SelectId === 0
    ) {
      const title = 'برروز خطا ';
      const message = 'دسته بندی انتخاب نشده است';
      this.toastrService.toastr.error(message, title);
      return;
    }
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
    const modalModel: ComponentModalDataModel = {
      Title: 'محتوای جدید',
      SwitchValue: 'contentContentAdd'
    };
    this.openModal(this.contentModal, modalModel);
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
    const modalModel: ComponentModalDataModel = {
      Title: 'ویرایش محتوا',
      SwitchValue: 'contentContentEdit'
    };
    this.openModal(this.contentModal, modalModel);
  }
  onActionbuttonDeleteRow() {
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
      !this.dataModelResult.Access.AccessDeleteRow
    ) {
      const title = 'برروز خطا ';
      const message = 'شما دسترسی برای حذف ندارید';
      this.toastrService.toastr.error(message, title);
      return;
    }
    const modalModel: ComponentModalDataModel = {
      Title: 'حذف محتوا',
      SwitchValue: 'contentContentDelete'
    };
    this.openModal(this.contentModal, modalModel);
  }
  onActionbuttonStatus() { }
  onActionbuttonExport() { }

  onActionbuttonReload() {
    this.DataGetAllContent();
  }
  onSubmitOptionsSearch(model: any) {
    this.filteModelContent.Filters = model;
    this.DataGetAllContent();
  }
}
