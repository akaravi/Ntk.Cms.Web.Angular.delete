import { GenderType } from "../Enums/genderType.enum";
import { BaseEntity } from "../base/baseEntity";

export class NewsContentModel extends BaseEntity<number> {
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
}
