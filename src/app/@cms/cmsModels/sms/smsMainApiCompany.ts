import { BaseEntity } from '../base/baseEntity';
import { SmsMainApiPath } from './smsMainApiPath';

export class SmsMainApiCompany extends BaseEntity<number> {
     Title: string;
     ServiceAvailableCredit:number;
     ServiceSumCredit:number;
     UserAvailableCredit:number;
     UserSumCredit:number;
     ServiceCreditLastEdit:Date;
     UserCreditLastEdit:Date;
     ApiPaths: SmsMainApiPath[]
}
