import { ComponentOptionModel } from 'ntk-cms-api';
import { ComponentModalDataModel } from 'app/@cms/cmsModels/base/componentModalModel';


export class ComponentOptionModalModel
  implements ComponentOptionModel<ComponentOptionModalDataModel, ComponentOptionModalActionsModel, ComponentOptionModalMethodsModel> {
  actions: ComponentOptionModalActionsModel;
  methods: ComponentOptionModalMethodsModel;
  data: ComponentOptionModalDataModel = new ComponentOptionModalDataModel();

  constructor() {
    this.data = new ComponentOptionModalDataModel();
  }
}

export class ComponentOptionModalActionsModel {
  onClose: () => void;
}
export class ComponentOptionModalMethodsModel {
  openModal: (x: ComponentModalDataModel) => void;
}
export class ComponentOptionModalDataModel {
  hidden: boolean;
  result: any;
  closeResult: string;
  reason: any;
}
