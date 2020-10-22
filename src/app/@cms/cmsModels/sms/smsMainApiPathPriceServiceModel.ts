import { BaseModuleEntity } from '../base/baseModuleEntity';

export class SmsMainApiPathPriceServiceModel extends BaseModuleEntity<number> {
    linkApiPathId?: any;
    regulatorNumber?: any;
    serviceUnicodePrice: number;
    serviceNormalPrice: number;
    userUnicodePrice: number;
    userNormalPrice: number;
    virtual_ApiPath?: any;
    apiPath?: any;
}
