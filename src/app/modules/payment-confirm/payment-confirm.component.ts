import { Component } from '@angular/core';
import { PaymentHelperService } from 'src/app/service/payment-helper.service';

@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html',
  styleUrls: ['./payment-confirm.component.scss'],
})
export class PaymentConfirmComponent {
  data: any;
  controls: any;
  constructor(private paymentHelperService: PaymentHelperService) {}

  ngOnInit(): void {
    this.data = this.paymentHelperService.getPaymentInformation;

    this.data.card_type = '001';
    this.data.card_number = '4242424242424242';
    this.data.card_expiry_date = '11-2023';

    this.controls = Object.keys(this.data).map((key) => {
      return {
        key: key,
        value: this.data[key],
      };
    });

    console.log('this.data', this.data);
  }
}
