import { BaseEntity } from "../base/baseEntity";
import { NewsContentModel } from "./newsContentModel";

export class NewsCategoryModel extends BaseEntity<number> {
  Title: string;
  Description: string;
  FontIcon: string;
  LinkMainImageId: number;
  LinkParentId: number;
  LinkParentIdNode: string;
  LinkMainImageSrc: string;
  Children: NewsCategoryModel[];
  Category: NewsCategoryModel;
  virtual_Category: NewsCategoryModel;
  Contents: NewsContentModel[];
}
