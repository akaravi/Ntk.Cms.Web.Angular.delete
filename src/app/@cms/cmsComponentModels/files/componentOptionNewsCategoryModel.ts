import { ComponentOptionModel } from 'ntk-cms-api';

export class ComponentOptionFileUploadModel
  implements ComponentOptionModel<ComponentOptionFileUploadDataModel, ComponentOptionFileUploadActionsModel, ComponentOptionFileUploadMethodsModel> {
  actions: ComponentOptionFileUploadActionsModel;
  methods: ComponentOptionFileUploadMethodsModel;
  data: ComponentOptionFileUploadDataModel;

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
