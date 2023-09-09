import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentConfirmComponent } from './modules/payment-confirm/payment-confirm.component';
import { PaymentResultComponent } from './modules/payment-result/payment-result.component';
import { PaymentStartComponent } from './modules/payment-start/payment-start.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentStartComponent,
    PaymentConfirmComponent,
    PaymentResultComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
