import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration }     from './configuration';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { StripPipePatient } from './strip.pipe';
import { StripPipeDoctor } from './strip.pipe';
import { StripPipeHospital,StripPipePharmacy } from './strip.pipe';

import { AdmitComponent } from './Admit/Admit.component';
import { OpConsultComponent } from './OpConsult/OpConsult.component';
import { LabTestComponent } from './LabTest/LabTest.component';
import { WearableComponent } from './Wearable/Wearable.component';
import { PrescriptionComponent } from './Prescription/Prescription.component';

@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    AdmitComponent,
		OpConsultComponent,
		LabTestComponent,
		WearableComponent,
		StripPipeDoctor,
    StripPipeHospital,
    StripPipePatient,
    StripPipePharmacy,
    PrescriptionComponent
		
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    Configuration,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
