import { ComponentOptionModel } from 'app/@cms/cmsModels/base/componentOptionModel';
import { SmsMainApiPathModel } from 'app/@cms/cmsModels/sms/smsMainApiPathModel';

export class ComponentOptionSmsMainApiPathModel
  extends ComponentOptionModel<ComponentOptionSmsMainApiPathDataModel, ComponentOptionSmsMainApiPathActionsModel, ComponentOptionSmsMainApiPathMethodsModel> {

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
