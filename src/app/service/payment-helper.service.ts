import { Injectable } from '@angular/core';
import * as UUID from 'uuid';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PaymentHelperService {
  private payment: any;
  SECRET_KEY: string = environment.CYBERSOURCE.SECRET_KEY;
  constructor() {}

  set setPaymentInformation(payment: any) {
    this.payment = payment;
  }

  get getPaymentInformation(): any {
    return this.payment;
  }

  initPayment(): any {
    let signedFieldNames =
      'access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code';
    let payment: any = {
      access_key: environment.CYBERSOURCE.ACCESS_KEY,
      profile_id: environment.CYBERSOURCE.PROFILE_ID,
      signed_field_names: signedFieldNames,
      unsigned_field_names: 'card_type,card_number,card_expiry_date',
      locale: 'en',
      transaction_uuid: UUID.v4(),
      signed_date_time: this.getUTCDate(), //"2017-02-28T14:38:33Z",
      transaction_type: 'authorization',
      reference_number: Math.floor(Math.random() * 10000 + 1).toString(),
      amount: '100.00',
      currency: 'USD',
      payment_method: 'card',
      bill_to_forename: 'John',
      bill_to_surname: 'Doe',
      bill_to_email: 'null@cybersource.com',
      bill_to_phone: '02890888888',
      bill_to_address_line1: '1 Card Lane',
      bill_to_address_city: 'My City',
      bill_to_address_state: 'CA',
      bill_to_address_country: 'US',
      bill_to_address_postal_code: '94043',
      card_type: '001',
      card_number: '4242424242424242',
      card_expiry_date: '11-2020',
      signature: '',
    };

    return payment;
  }

  private getUTCDate(): string {
    var now = new Date();
    var now_utc =
      now.getUTCFullYear() +
      '-' +
      this.appendZero(now.getUTCMonth() + 1) +
      '-' +
      this.appendZero(now.getUTCDate()) +
      'T' +
      this.appendZero(now.getUTCHours()) +
      ':' +
      this.appendZero(now.getUTCMinutes()) +
      ':' +
      this.appendZero(now.getUTCSeconds()) +
      'Z';
    return now_utc;
  }

  private appendZero(digit: any): string {
    if (digit < 10) return '0' + digit;
    else return digit;
  }

  calculateHash(fieldValues: string[]): string {
    const dataToHash = fieldValues.join(',');
    const hash = CryptoJS.HmacSHA256(dataToHash, this.SECRET_KEY);
    const base64Hash = CryptoJS.enc.Base64.stringify(hash);
    return base64Hash;
  }

  encrypt(formData: any, isValid: any): any {
    if (isValid) {
      let signedFields = formData.signed_field_names.split(',');

      let fieldValues: any = [];

      signedFields.forEach((item: any) => {
        fieldValues.push(item + '=' + formData[item]);
      });

      let hash = this.calculateHash(fieldValues);

      return hash;
    }
  }
}
