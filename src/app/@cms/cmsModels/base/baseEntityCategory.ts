import { RecordStatus } from '../Enums/recordStatus.enum';
import { BaseEntity } from './baseEntity';

export class baseEntityCategory<TKey> extends  BaseEntity<TKey> {
  Title: string;
  LinkMainImageId: number;
  Description: string;
  FontIcon: string;
  LinkParentId: TKey;
  LinkParentIdNode: string;
  LinkMainImageSrc: string;
}
