import { GenderType } from '../Enums/genderType.enum';
import { BaseEntity } from '../base/baseEntity';
import { NewsCategoryModel } from './newsCategoryModel';
import { BaseModuleEntity } from '../base/baseModuleEntity';

export class NewsContentTagModel extends BaseModuleEntity<number> {
  Title: string;
}
