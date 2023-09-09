import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.scss'],
})
export class PaymentResultComponent {
  ngOnInit(): void {
    console.log('PaymentResultComponent');
  }
}
