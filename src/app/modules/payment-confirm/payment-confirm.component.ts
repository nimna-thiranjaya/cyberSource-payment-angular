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
  validationErrors: { [key: string]: string } = {};
  isFormValid = false;

  constructor(private paymentHelperService: PaymentHelperService) {}

  ngOnInit(): void {
    this.data = this.paymentHelperService.getPaymentInformation;

    // this.data.card_type = '001';
    // this.data.card_number = '4242424242424242';
    // this.data.card_expiry_date = '11-2023';

    this.controls = Object.keys(this.data).map((key) => {
      return {
        key: key,
        value: this.data[key],
      };
    });

    console.log('this.data', this.data);
  }

  validateCardType() {
    if (!this.data.card_type) {
      this.validationErrors['card_type'] = 'Card Type is required.';
    } else {
      delete this.validationErrors['card_type'];
    }
  }

  validateCardNumber() {
    const cardNumber = this.data.card_number;

    if (!cardNumber) {
      this.validationErrors['card_number'] = 'Card Number is required.';
    } else {
      // Regular expression pattern for a 16-digit card number
      const cardNumberPattern = /^[0-9]{16}$/;

      if (!cardNumberPattern.test(cardNumber)) {
        this.validationErrors['card_number'] =
          'Invalid card number. Please enter a 16-digit card number.';
      } else {
        // Clear the error message if valid
        delete this.validationErrors['card_number'];
      }
    }
  }

  validateCardExpiryDate() {
    const cardExpiryDate = this.data.card_expiry_date;

    if (!cardExpiryDate) {
      this.validationErrors['card_expiry_date'] = 'Expiry Date is required.';
    } else {
      // Custom regular expression pattern for "MM-YYYY" format
      const expiryDatePattern = /^(0[1-9]|1[0-2])-(19|20)\d{2}$/;

      if (!expiryDatePattern.test(cardExpiryDate)) {
        this.validationErrors['card_expiry_date'] =
          'Invalid expiry date. Please enter a valid MM-YYYY format (e.g., 11-2030).';
      } else {
        // Clear the error message if valid
        delete this.validationErrors['card_expiry_date'];
      }
    }
  }

  checkFormValidity() {
    this.validateCardType();
    this.validateCardNumber();
    this.validateCardExpiryDate();

    // Check if there are no validation errors
    this.isFormValid = Object.keys(this.validationErrors).length === 0;
  }

  onDataChanged() {
    this.checkFormValidity();
  }
}
