import { RecordStatus } from '../Enums/recordStatus.enum';
import { BaseEntity } from './baseEntity';

export class BaseModuleEntity<TKey> extends BaseEntity<TKey> {
  LinkSiteId: number;

}
