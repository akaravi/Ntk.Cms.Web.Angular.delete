import { ComponentOptionModel } from 'app/@cms/cmsModels/base/componentOptionModel';
import { SmsMainApiPathCompanyModel } from 'app/@cms/cmsModels/sms/smsMainApiCompanyModel';

export class ComponentOptionSmsMainApiPathCompanyModel
  implements ComponentOptionModel<ComponentOptionSmsMainApiPathCompanyDataModel, ComponentOptionSmsMainApiPathCompanyActionsModel, ComponentOptionSmsMainApiPathCompanyMethodsModel> {
  actions: ComponentOptionSmsMainApiPathCompanyActionsModel;
  methods: ComponentOptionSmsMainApiPathCompanyMethodsModel;
  data: ComponentOptionSmsMainApiPathCompanyDataModel;

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
