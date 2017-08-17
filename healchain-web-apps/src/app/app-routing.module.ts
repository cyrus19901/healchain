import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { AdmitComponent } from './Admit/Admit.component';
import { OpConsultComponent } from './OpConsult/OpConsult.component';
import { LabTestComponent } from './LabTest/LabTest.component';
import { WearableComponent } from './Wearable/Wearable.component';
import { PrescriptionComponent } from './Prescription/Prescription.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Admit', component: AdmitComponent},
		
		{ path: 'OpConsult', component: OpConsultComponent},
		
		{ path: 'LabTest', component: LabTestComponent},
		
		{ path: 'Wearable', component: WearableComponent},
		
		{ path: 'Prescription', component: PrescriptionComponent},
		
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
