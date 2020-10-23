import { ComponentOptionModel } from 'app/@cms/cmsModels/base/componentOptionModel';

export class ComponentOptionFileUploadModel
  extends ComponentOptionModel<ComponentOptionFileUploadDataModel, ComponentOptionFileUploadActionsModel, ComponentOptionFileUploadMethodsModel> {

}

export class ComponentOptionFileUploadActionsModel {
  onActionSelect: (x: any) => void;
}
export class ComponentOptionFileUploadMethodsModel {
  ActionReload: () => void;
}
export class ComponentOptionFileUploadDataModel {
  fileName: string;
  fileKey: string;
}
