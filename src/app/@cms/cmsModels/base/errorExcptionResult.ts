import { DataFieldInfoModel, FieldInfoModel } from './fieldInfo/fieldInfoModel';

export class ErrorExcptionResultBase {
  Status = 0;
  IsSuccess = true;
  errors: Map<string, Array<string>>;
  ErrorMessage: string;
}
export class ErrorExcptionResult<T> extends ErrorExcptionResultBase {
  ListItems: Array<T>;
  Item: T;
  CurrentPageNumber: number;
  TotalRowCount: number;
  RowPerPage: number;
  Access: AccessModel = new AccessModel();
}
export class AccessModel {
  AccessDeleteRow = false;
  AccessWatchRow = false;
  AccessEditRow = false;
  AccessAddRow = false;
  AccessRowInPanelDemo = false;
  AccessRowWatchInSharingCategory = false;
  AccessWatchRowOtherSiteId = false;
  AccessWatchRowOtherCreatedBy = false;
  AccessEditRowOtherSiteId = false;
  AccessEditRowOtherCreatedBy = false;
  AccessDeleteRowOtherCreatedBy = false;

  FieldsInfo: Array<DataFieldInfoModel>;
}
