import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentStartComponent } from './modules/payment-start/payment-start.component';
import { PaymentConfirmComponent } from './modules/payment-confirm/payment-confirm.component';
import { PaymentResultComponent } from './modules/payment-result/payment-result.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentStartComponent,
  },
  {
    path: 'payment-confirm',
    component: PaymentConfirmComponent,
  },
  {
    path: 'payment-success',
    component: PaymentResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
