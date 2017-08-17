import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AdmitService } from './Admit.service';
import 'rxjs/add/operator/toPromise';
import { StripPipePatient } from '../strip.pipe';
import { StripPipeDoctor } from '../strip.pipe';
import { StripPipeHospital, StripPipePharmacy } from '../strip.pipe';
@Component({
	selector: 'app-Admit',
	templateUrl: './Admit.component.html',
	styleUrls: ['./Admit.component.css'],
  providers: [AdmitService]
})
export class AdmitComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      admitId = new FormControl("", Validators.required);
  
      admitStatus = new FormControl("", Validators.required);
  
      hospital = new FormControl("", Validators.required);
  
      patient = new FormControl("", Validators.required);
  
      doctors = new FormControl("", Validators.required);
  
      labTests = new FormControl("", Validators.required);
  
      prescriptions = new FormControl("", Validators.required);
  
      statusUpdates = new FormControl("", Validators.required);
  
      diagnosisUpdates = new FormControl("", Validators.required);
  
      dischargeSummary = new FormControl("", Validators.required);
  


  constructor(private serviceAdmit:AdmitService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          admitId:this.admitId,
        
    
        
          admitStatus:this.admitStatus,
        
    
        
          hospital:this.hospital,
        
    
        
          patient:this.patient,
        
    
        
          doctors:this.doctors,
        
    
        
          labTests:this.labTests,
        
    
        
          prescriptions:this.prescriptions,
        
    
        
          statusUpdates:this.statusUpdates,
        
    
        
          diagnosisUpdates:this.diagnosisUpdates,
        
    
        
          dischargeSummary:this.dischargeSummary
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceAdmit.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

  addAsset(form: any): Promise<any> {

    this.asset = {
      $class: "com.healchain.network.hospital.Admit",
      
        
          "admitId":this.admitId.value,
        
      
        
          "admitStatus":this.admitStatus.value,
        
      
        
          "hospital":this.hospital.value,
        
      
        
          "patient":this.patient.value,
        
      
        
          "doctors":this.doctors.value,
        
      
        
          "labTests":this.labTests.value,
        
      
        
          "prescriptions":this.prescriptions.value,
        
      
        
          "statusUpdates":this.statusUpdates.value,
        
      
        
          "diagnosisUpdates":this.diagnosisUpdates.value,
        
      
        
          "dischargeSummary":this.dischargeSummary.value
        
      
    };

    this.myForm.setValue({
      
        
          "admitId":null,
        
      
        
          "admitStatus":null,
        
      
        
          "hospital":null,
        
      
        
          "patient":null,
        
      
        
          "doctors":null,
        
      
        
          "labTests":null,
        
      
        
          "prescriptions":null,
        
      
        
          "statusUpdates":null,
        
      
        
          "diagnosisUpdates":null,
        
      
        
          "dischargeSummary":null
        
      
    });

    return this.serviceAdmit.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "admitId":null,
        
      
        
          "admitStatus":null,
        
      
        
          "hospital":null,
        
      
        
          "patient":null,
        
      
        
          "doctors":null,
        
      
        
          "labTests":null,
        
      
        
          "prescriptions":null,
        
      
        
          "statusUpdates":null,
        
      
        
          "diagnosisUpdates":null,
        
      
        
          "dischargeSummary":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "com.healchain.network.hospital.Admit",
      
        
          
        
    
        
          
            "admitStatus":this.admitStatus.value,
          
        
    
        
          
            "hospital":this.hospital.value,
          
        
    
        
          
            "patient":this.patient.value,
          
        
    
        
          
            "doctors":this.doctors.value,
          
        
    
        
          
            "labTests":this.labTests.value,
          
        
    
        
          
            "prescriptions":this.prescriptions.value,
          
        
    
        
          
            "statusUpdates":this.statusUpdates.value,
          
        
    
        
          
            "diagnosisUpdates":this.diagnosisUpdates.value,
          
        
    
        
          
            "dischargeSummary":this.dischargeSummary.value
          
        
    
    };

    return this.serviceAdmit.updateAsset(form.get("admitId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceAdmit.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceAdmit.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "admitId":null,
          
        
          
            "admitStatus":null,
          
        
          
            "hospital":null,
          
        
          
            "patient":null,
          
        
          
            "doctors":null,
          
        
          
            "labTests":null,
          
        
          
            "prescriptions":null,
          
        
          
            "statusUpdates":null,
          
        
          
            "diagnosisUpdates":null,
          
        
          
            "dischargeSummary":null 
          
        
      };



      
        if(result.admitId){
          formObject.admitId = result.admitId;
        }else{
          formObject.admitId = null;
        }
      
        if(result.admitStatus){
          formObject.admitStatus = result.admitStatus;
        }else{
          formObject.admitStatus = null;
        }
      
        if(result.hospital){
          formObject.hospital = result.hospital;
        }else{
          formObject.hospital = null;
        }
      
        if(result.patient){
          formObject.patient = result.patient;
        }else{
          formObject.patient = null;
        }
      
        if(result.doctors){
          formObject.doctors = result.doctors;
        }else{
          formObject.doctors = null;
        }
      
        if(result.labTests){
          formObject.labTests = result.labTests;
        }else{
          formObject.labTests = null;
        }
      
        if(result.prescriptions){
          formObject.prescriptions = result.prescriptions;
        }else{
          formObject.prescriptions = null;
        }
      
        if(result.statusUpdates){
          formObject.statusUpdates = result.statusUpdates;
        }else{
          formObject.statusUpdates = null;
        }
      
        if(result.diagnosisUpdates){
          formObject.diagnosisUpdates = result.diagnosisUpdates;
        }else{
          formObject.diagnosisUpdates = null;
        }
      
        if(result.dischargeSummary){
          formObject.dischargeSummary = result.dischargeSummary;
        }else{
          formObject.dischargeSummary = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "admitId":null,
        
      
        
          "admitStatus":null,
        
      
        
          "hospital":null,
        
      
        
          "patient":null,
        
      
        
          "doctors":null,
        
      
        
          "labTests":null,
        
      
        
          "prescriptions":null,
        
      
        
          "statusUpdates":null,
        
      
        
          "diagnosisUpdates":null,
        
      
        
          "dischargeSummary":null 
        
      
      });
  }

}
