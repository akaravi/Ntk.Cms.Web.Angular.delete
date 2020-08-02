import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { CoreEnumService } from "app/@cms/cmsService/core/coreEnum.service";
import { ToastrService } from "ngx-toastr";
import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { enumModel } from 'app/@cms/cmsModels/base/enumModel';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';

@Component({
  selector: "app-news-category-add",
  templateUrl: "./categoryAdd.component.html",
  styleUrls: ["./categoryAdd.component.scss"],
})
export class NewsCategoryAddComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private coreEnumService: CoreEnumService,
    private alertService: ToastrService,
    private publicHelper: PublicHelper
  ) {}
  
  dataCoreEnumService: ErrorExcptionResult<any> = new ErrorExcptionResult<any>();

  Id: any;
  ngOnInit() {
    this.Id = Number.parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.activatedRoute.queryParams.subscribe((params) => {
      // Defaults to 0 if no query param provided.
      this.Id = +params["id"] || 0;
    });

    this.DataGetAllCoreEnum();
  }
  DataGetAllCoreEnum() {

    this.coreEnumService.ServiceEnumRecordStatus().subscribe(
      (next) => {
        if (next.IsSuccess) {
          this.dataCoreEnumService = next;
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
}
