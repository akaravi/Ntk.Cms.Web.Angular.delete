import { BaseEntity } from '../base/baseEntity';
import { SmsMainApiPathModel } from './smsMainApiPathModel';

export class SmsMainApiPathCompanyModel extends BaseEntity<number> {
     Title: string;
     Description: string;
     ServiceAvailableCredit: number;
     ServiceSumCredit: number;
     UserAvailableCredit: number;
     UserSumCredit: number;
     ServiceCreditLastEdit: Date;
     UserCreditLastEdit: Date;
     ApiPaths: SmsMainApiPathModel[]
}
