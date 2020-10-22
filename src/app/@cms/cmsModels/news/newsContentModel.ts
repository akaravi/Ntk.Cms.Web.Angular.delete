import { GenderType } from '../Enums/genderType.enum';
import { BaseEntity } from '../base/baseEntity';
import { NewsCategoryModel } from './newsCategoryModel';
import { NewsContentTagModel } from './newsContentTagModel';
import { NewsContentSimilar } from './newsContentSimilar';
import { BaseModuleEntity } from '../base/baseModuleEntity';


export class NewsContentModel extends BaseModuleEntity<number> {
  linkCategoryId: number;
  Title: string;
  Description: string;
  body: string;
  fromDate: Date;
  geolocationlatitude: number;
  geolocationlongitude: number;
  keyword: string;
  linkFileIds: string;
  linkFilePodcastId: number;
  linkFileMovieId: number;
  linkMainImageId: number;
  scoreClick: number;
  scoreSumPercent: number;
  viewCount: number;
  favorited: boolean;
  mainImageSrc: string;
  ExpireDate: string;
  ModuleCoreCreatedBy: string;
  ModuleCoreUpdatedBy: string;
  Source: string;
  Comments: string;
  virtual_Category: NewsCategoryModel;
  Category: NewsCategoryModel;
  ContentTags: NewsContentTagModel[];
  Similars: NewsContentSimilar[];
  OtherInfos: string;
  ContentAndParameterValues: any;
  LinkFileIds: string;
  LinkFilePodcastId: number;
  LinkFileMovieId: number;
  ScoreSumPercent: number;
  ViewCount: number;
  LinkFilePodcastIdSrc: string;
  LinkFileMovieIdSrc: string;
  LinkFileIdsSrc: string[];

}
