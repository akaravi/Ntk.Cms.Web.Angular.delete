import { ComponentOptionModel } from 'app/@cms/cmsModels/base/componentOptionModel';
import { NewsCategoryModel } from 'app/@cms/cmsModels/news/newsCategoryModel';

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
