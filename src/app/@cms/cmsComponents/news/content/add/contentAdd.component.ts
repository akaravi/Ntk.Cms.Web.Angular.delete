import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PublicHelper} from 'app/@cms/cmsCommon/helper/publicHelper';
import {CmsToastrService} from 'app/@cms/cmsService/base/cmsToastr.service';
import {CoreEnumService, EnumModel, ErrorExcptionResult, FormInfoModel, NewsContentModel, NewsContentService} from 'ntk-cms-api';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Leaflet from 'leaflet';
import {LocalAccessHelper} from '../../../../cmsCommon/helper/localAccessHelper';

@Component({
    selector: 'app-news-content-add',
    templateUrl: './add.component.html',
    styleUrls: ['./contentAdd.component.scss'],
})
export class NewsContentAddComponent implements OnInit, AfterViewInit {

    name = 'Angular';
    editor = ClassicEditor;
    data: any = `<p>Hello, world!</p>`;

    @Input()
    set options(model: any) {
        this.dateModleInput = model;
    }

    get options(): any {
        return this.dateModleInput;
    }

    @ViewChild('vform', {static: false}) formGroup: FormGroup;
    private dateModleInput: any;
    formInfo: FormInfoModel = new FormInfoModel();
    dataModel: NewsContentModel = new NewsContentModel();
    dataModelResult: ErrorExcptionResult<NewsContentModel> = new ErrorExcptionResult<NewsContentModel>();
    linkCategoryId: number;
    loadingStatus = false; // add one more property
    dataModelEnumRecordStatusResult: ErrorExcptionResult<EnumModel> = new ErrorExcptionResult<EnumModel>();
    map: any;
    theMarker: any;
    lat: any;
    lon: any;
    parentId = 0;
    public viewModel: any
    filterName: any [] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        public newsContentService: NewsContentService,
        public coreEnumService: CoreEnumService,
        private toastrService: CmsToastrService,
        private publicHelper: PublicHelper,
        public  accessHelper: LocalAccessHelper
    ) {
    }

    ngOnInit() {

        this.activatedRoute.queryParams.subscribe((params) => {
            this.parentId = +params.parentId || 0;
        });
        this.linkCategoryId = Number(
            this.activatedRoute.snapshot.paramMap.get('id')
        );
        this.activatedRoute.queryParams.subscribe((params) => {
            this.linkCategoryId = +params['id'] || 0;
        });
        if (this.dateModleInput && this.dateModleInput.linkCategoryId) {
            this.linkCategoryId = this.dateModleInput.linkCategoryId;
        }
        this.getEnumRecordStatus();
    }

    ngAfterViewInit(): void {
        this.newsContentService.ServiceViewModel().subscribe((res) => {
            this.accessHelper.setAccessValue(res.Access);
        });
        this.map = Leaflet.map('map', {center: [32.684985, 51.6359425], zoom: 16});
        Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
        this.map.on('click', (e) => {
            // @ts-ignore
            this.lat = e.latlng.lat;
            // @ts-ignore
            this.lon = e.latlng.lng;
            if (this.theMarker !== undefined) {
                this.map.removeLayer(this.theMarker);
            }
            this.theMarker = Leaflet.marker([this.lat, this.lon]).addTo(this.map);
        });
    }

    getEnumRecordStatus(): void {
        this.coreEnumService.ServiceEnumRecordStatus().subscribe((res) => {
            this.dataModelEnumRecordStatusResult = res;
        });
    }

    onFormSubmit() {
        // if (this.formGroup.valid) {
        //     this.formInfo.FormAllowSubmit = false;
        //     this.DataAddContent();
        // }
        this.DataAddContent();
    }

    onFormCancel() {
        this.formGroup.reset();
    }

    DataAddContent() {
        this.dataModel.LinkCategoryId = this.parentId;
        this.formInfo.FormAlert = 'در حال ارسال اطلاعات به سرور';
        this.formInfo.FormError = '';
        this.loadingStatus = true;
        this.newsContentService
            .ServiceAdd(this.dataModel)
            .subscribe(
                (next) => {
                    this.loadingStatus = false;
                    this.formInfo.FormAllowSubmit = !next.IsSuccess;
                    this.dataModelResult = next;
                    if (next.IsSuccess) {
                        this.formInfo.FormAlert = 'ثبت با موفقت انجام شد';
                    } else {
                        const title = 'برروز خطا ';
                        const message = next.ErrorMessage;
                        this.toastrService.toastr.error(message, title);
                    }
                },
                (error) => {
                    this.loadingStatus = false;
                    this.formInfo.FormAllowSubmit = true;

                    const title = 'برروی خطا در دریافت اطلاعات';
                    const message = this.publicHelper.CheckError(error);
                    this.toastrService.toastr.error(message, title);
                }
            );
    }

    setFocus($event) {
        $event.focus();
    }

    onValueChange(model: any): any {
        return model.value;
    }

}
