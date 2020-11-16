import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
} from '@angular/core';

import {PublicHelper} from 'app/@cms/cmsCommon/helper/publicHelper';

import {
    ColumnMode,
    TableColumn,
    SelectionType,
} from '@swimlane/ngx-datatable';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {BaseComponent} from 'app/@cms/cmsComponents/_base/baseComponent';
import {ComponentModalDataModel} from 'app/@cms/cmsModels/base/componentModalModel';
import {ComponentOptionNewsCategoryModel} from 'app/@cms/cmsComponentModels/news/componentOptionNewsCategoryModel';
import {ComponentOptionSearchContentModel} from 'app/@cms/cmsComponentModels/base/componentOptionSearchContentModel';
import {ComponentOptionModalModel} from 'app/@cms/cmsComponentModels/base/componentOptionModalModel';
import {EnumSortType, ErrorExcptionResult, FilterDataModel, FilterModel, NewsCategoryModel, NewsContentModel, NewsContentService} from 'ntk-cms-api';
import {CmsToastrService} from 'app/@cms/cmsService/base/cmsToastr.service';
import {ActivatedRoute, Router} from '@angular/router';
import {findReadVarNames} from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-news-content-list',
    templateUrl: './contentList.component.html',
    styleUrls: ['./contentList.component.scss'],
})
export class NewsContentListComponent extends BaseComponent implements OnInit {
    @ViewChild('contentModal', {static: false})
    contentModal: ElementRef;
    loadingStatus = false; // add one more property
    getId: number;
    filteModelContent = new FilterModel();
    filteModelCategory = new FilterModel();
    dataModelResult: ErrorExcptionResult<any> = new ErrorExcptionResult<any>();
    dataModelResultCategory: ErrorExcptionResult<any> = new ErrorExcptionResult<any>();
    dataModelResultViewModel: ErrorExcptionResult<any> = new ErrorExcptionResult<any>();
    // Table Column Titles
    columnMode = ColumnMode;
    selectionType = SelectionType;

    tableContentloading = false;
    tableContentSelected: Array<NewsContentModel> = [];
    modalModel: ComponentModalDataModel = new ComponentModalDataModel();
    columnsContent: TableColumn[] = [
        {
            prop: 'RecordStatus',
            name: 'وضعیت',
            pipe: {transform: this.publicHelper.RecordStatus},
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
            pipe: {transform: this.publicHelper.LocaleDate},
        },
        {
            prop: 'UpdatedDate',
            name: 'ویرایش',
            pipe: {transform: this.publicHelper.LocaleDate},
        },
        {
            prop: 'Title',
            name: 'عنوان',
            pipe: {transform: this.publicHelper.Truncate},
        },
        {
            prop: 'Description',
            name: 'توضیحات',
            pipe: {transform: this.publicHelper.Truncate},
        },
    ];
    categoryId: number;

    optionsCategorySelect: ComponentOptionNewsCategoryModel = new ComponentOptionNewsCategoryModel();
    optionModelModal: ComponentOptionModalModel = new ComponentOptionModalModel();

    closeResult: string;
    optionsSearch: ComponentOptionSearchContentModel = new ComponentOptionSearchContentModel();

    constructor(
        private toastrService: CmsToastrService,
        private publicHelper: PublicHelper,
        private modalService: NgbModal,
        public contentService: NewsContentService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        super();
        this.optionsSearch.actions = {onSubmit: (model) => this.onSubmitOptionsSearch(model)}

    }

    ngOnInit() {

        this.optionsCategorySelect.actions = {onActionSelect: (x) => this.onActionCategorySelect(x)};
        this.optionModelModal.actions = {onClose: () => this.onCloseModal()};

        this.DataGetAllContent();
    }

    onCloseModal() {


    }

    // Open default modal
    openModal(content, contentModal: ComponentModalDataModel) {
        this.optionModelModal.methods.openModal(contentModal);
        this.modalModel = contentModal;
    }

    onActionCategoryReload() {
        this.optionsCategorySelect.methods.ActionReload();
    }


    DataGetAllContent() {
        this.tableContentSelected = [];
        this.tableContentloading = true;
        this.loadingStatus = true;
        this.filteModelContent.AccessLoad = true;
        this.contentService.ServiceGetAll(this.filteModelContent).subscribe(
            (next) => {
                if (next.IsSuccess) {
                    this.dataModelResult = next;
                    this.optionsSearch.methods.setAccess(next.Access);

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
        this.categoryId = model.Id;
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
                this.filteModelContent.SortType = EnumSortType.Descending;
            } else {
                this.filteModelContent.SortType = EnumSortType.Ascending;
            }
            this.filteModelContent.SortColumn = sort.prop;
        }
        this.DataGetAllContent();
    }

    onActionSelect(event) {
        this.getId = event.selected[0].Id;
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

    onActionbuttonStatus() {
    }

    onActionbuttonExport() {
    }

    onActionbuttonReload() {
        this.DataGetAllContent();
    }

    onSubmitOptionsSearch(model: any) {
        this.filteModelContent.Filters = model;
        this.DataGetAllContent();
    }

    ActionAdd(): void {
        this.router.navigate(['add'], {relativeTo: this.activatedRoute, queryParams: {parentId: this.categoryId}});
    }

    ActionEdit(): void {
        this.router.navigate(['edit'], {relativeTo: this.activatedRoute, queryParams: {id: this.getId}});
    }
    onClickComment(): void {
        this.router.navigate(['comment/', this.getId], {relativeTo: this.activatedRoute});
    }
}
