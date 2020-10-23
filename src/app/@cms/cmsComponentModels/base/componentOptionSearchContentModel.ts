import { ComponentOptionModel } from 'app/@cms/cmsModels/base/componentOptionModel';
import { AccessModel } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { FilterDataModel } from 'app/@cms/cmsModels/base/filterModel';
import { data } from '../../../shared/data/smart-data-table';

export class ComponentOptionSearchContentModel
  implements ComponentOptionModel<ComponentOptionSearchContentDataModel, ComponentOptionSearchContentActionsModel, ComponentOptionSearchContentMethodsModel> {
  actions: ComponentOptionSearchContentActionsModel;
  methods: ComponentOptionSearchContentMethodsModel;
  data: ComponentOptionSearchContentDataModel = new ComponentOptionSearchContentDataModel();
  constructor() {
    this.data = new ComponentOptionSearchContentDataModel();
  }
}

export class ComponentOptionSearchContentActionsModel {
  onSubmit: (x: Array<FilterDataModel>) => void;
}
export class ComponentOptionSearchContentMethodsModel {
  setAccess: (x: AccessModel) => void;
}
export class ComponentOptionSearchContentDataModel {
  hidden: boolean;
  Select: any;
  Access: AccessModel;
}
