import { ComponentOptionModel, SmsMainApiPathModel } from 'ntk-cms-api';

export class ComponentOptionSmsMainApiPathModel
  implements ComponentOptionModel<ComponentOptionSmsMainApiPathDataModel, ComponentOptionSmsMainApiPathActionsModel, ComponentOptionSmsMainApiPathMethodsModel> {
  actions: ComponentOptionSmsMainApiPathActionsModel;
  methods: ComponentOptionSmsMainApiPathMethodsModel;
  data: ComponentOptionSmsMainApiPathDataModel;

}

export class ComponentOptionSmsMainApiPathActionsModel {
  onActionSelect: (x: SmsMainApiPathModel) => void;
}
export class ComponentOptionSmsMainApiPathMethodsModel {
  ActionReload: () => void;
}
export class ComponentOptionSmsMainApiPathDataModel {
  SelectId: number;
  Select: SmsMainApiPathModel;
}
