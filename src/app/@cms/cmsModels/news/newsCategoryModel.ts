import { BaseEntity } from "../base/baseEntity";
import { baseEntityCategory } from '../base/baseEntityCategory';
import { NewsContentModel } from "./newsContentModel";

export class NewsCategoryModel extends baseEntityCategory<number> {
  
  Children: NewsCategoryModel[];
  Category: NewsCategoryModel;
  virtual_Category: NewsCategoryModel;
  Contents: NewsContentModel[];
}
