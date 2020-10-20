import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { CoreSiteService } from "../../../../cmsService/core/coreSite.service";
import { CoreSiteCategoryModuleService } from "../../../../cmsService/core/coreSiteCategoryModule.service";
import { CoreModuleService } from "../../../../cmsService/core/coreModule.service";
import { CoreSiteCategoryService } from "../../../../cmsService/core/coreSiteCategory.service";
import { FilterModel } from "app/@cms/cmsModels/base/filterModel";
import { ErrorExcptionResult } from "app/@cms/cmsModels/base/errorExcptionResult";
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { CmsToastrServiceService } from 'app/@cms/cmsService/_base/cmsToastrService.service';

@Component({
  selector: "app-cms-site-list",
  templateUrl: "./coreSiteList.component.html",
  styleUrls: ["./coreSiteList.component.scss"],
})
export class CoreSiteListComponent implements OnInit {
  // Table Column Titles
  columns = [
    {
      prop: "Title",
    },
    {
      name: "Domain",
    },
    {
      name: "SubDomain",
    },
  ];
  @ViewChild(DatatableComponent, { static: false })
  table: DatatableComponent;

  constructor(
    private toastrService: CmsToastrServiceService,
    private publicHelper: PublicHelper,
    private coreSiteService: CoreSiteService,
    private coreSiteCategoryModuleService: CoreSiteCategoryModuleService,
    private coreModuleService: CoreModuleService,
    private coreSiteCategoryService: CoreSiteCategoryService
  ) {}
  filteModel = new FilterModel();
  dataModelSite: ErrorExcptionResult<any> = new ErrorExcptionResult<any>();

  ngOnInit() {
    this.DataGetAll();
  }
  DataGetAll() {
    this.coreSiteService.ServiceGetAll(this.filteModel).subscribe(
      (next) => {
        if (next.IsSuccess) {
          this.dataModelSite = next;
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
}
