import { Router } from '@angular/router';
import { PaymentHelperService } from './../../service/payment-helper.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-start',
  templateUrl: './payment-start.component.html',
  styleUrls: ['./payment-start.component.scss'],
})
export class PaymentStartComponent {
  data: any;
  constructor(
    private paymentHelperService: PaymentHelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.data = this.paymentHelperService.initPayment();
  }

  encryptData(formData: any, isValid: any): void {
    formData.signature = this.paymentHelperService.encrypt(formData, isValid);

    this.paymentHelperService.setPaymentInformation = formData;
    this.router.navigate(['/payment-confirm']);
  }
}
