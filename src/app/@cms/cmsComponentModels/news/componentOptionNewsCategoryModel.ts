import { ComponentOptionModel, NewsCategoryModel } from 'ntk-cms-api';

export class ComponentOptionNewsCategoryModel implements ComponentOptionModel<ComponentOptionNewsCategoryDataModel, ComponentOptionNewsCategoryActionsModel, ComponentOptionNewsCategoryMethodsModel> {
  actions: ComponentOptionNewsCategoryActionsModel;
  methods: ComponentOptionNewsCategoryMethodsModel;
  data: ComponentOptionNewsCategoryDataModel;

}

export class ComponentOptionNewsCategoryActionsModel {
  onActionSelect: (x: NewsCategoryModel) => void;
}
export class ComponentOptionNewsCategoryMethodsModel {
  ActionReload: () => void;
}
export class ComponentOptionNewsCategoryDataModel {
  SelectId: number;
  Select: NewsCategoryModel;
}
