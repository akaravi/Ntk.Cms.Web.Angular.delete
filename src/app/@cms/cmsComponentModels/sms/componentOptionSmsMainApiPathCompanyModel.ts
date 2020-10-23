import { ComponentOptionModel } from 'app/@cms/cmsModels/base/componentOptionModel';
import { SmsMainApiPathCompanyModel } from 'app/@cms/cmsModels/sms/smsMainApiCompanyModel';

export class ComponentOptionSmsMainApiPathCompanyModel
  extends ComponentOptionModel<ComponentOptionSmsMainApiPathCompanyDataModel, ComponentOptionSmsMainApiPathCompanyActionsModel, ComponentOptionSmsMainApiPathCompanyMethodsModel> {

}

export class ComponentOptionSmsMainApiPathCompanyActionsModel {
  onActionSelect: (x: SmsMainApiPathCompanyModel) => void;
}
export class ComponentOptionSmsMainApiPathCompanyMethodsModel {
  ActionReload: () => void;
}
export class ComponentOptionSmsMainApiPathCompanyDataModel {
  SelectId: number;
  Select: SmsMainApiPathCompanyModel;
}
