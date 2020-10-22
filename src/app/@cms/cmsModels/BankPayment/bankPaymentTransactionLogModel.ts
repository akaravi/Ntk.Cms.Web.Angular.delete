import { BaseEntity } from '../base/baseEntity';
import { EnumTransactionRecordStatus } from '../enums/bankPayment.enum';
import { BankPaymentTransactionModel } from './bankPaymentTransactionModel';

export class BankPaymentTransactionLogModel  extends BaseEntity<number> {
    TransactionStatus :EnumTransactionRecordStatus;
     LinkTransactionId :number;

     virtual_Transaction: BankPaymentTransactionModel;
      Transaction :BankPaymentTransactionModel;
    
     Memo :string;
}
