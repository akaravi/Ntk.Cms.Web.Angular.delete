import { BaseEntity } from '../base/baseEntity';
import { SmsMainApiPathModel } from './smsMainApiPathModel';

export class SmsMainApiCompanyModel extends BaseEntity<number> {
     Title: string;
     Description: string;
     ServiceAvailableCredit:number;
     ServiceSumCredit:number;
     UserAvailableCredit:number;
     UserSumCredit:number;
     ServiceCreditLastEdit:Date;
     UserCreditLastEdit:Date;
     ApiPaths: SmsMainApiPathModel[]
}
