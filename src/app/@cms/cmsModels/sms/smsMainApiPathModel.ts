import { BaseEntity } from '../base/baseEntity';

export class SmsMainApiPathModel extends BaseEntity<number> {
    LinkApiPathCompanyId :number;
    Title:string;
    Description:string;
    ApiDefaultNumber:string;
    ApiIdentity:number;
    Priority:number;
    Status:boolean;
}
