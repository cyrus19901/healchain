import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PrescriptionService } from './Prescription.service';
import { StripPipePatient } from '../strip.pipe';
import { StripPipeDoctor } from '../strip.pipe';
import { StripPipeHospital, StripPipePharmacy } from '../strip.pipe';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Prescription',
	templateUrl: './Prescription.component.html',
	styleUrls: ['./Prescription.component.css'],
  providers: [PrescriptionService]
})
export class PrescriptionComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      prescriptionId = new FormControl("", Validators.required);
  
      hospital = new FormControl("", Validators.required);
  
      patient = new FormControl("", Validators.required);
  
      doctor = new FormControl("", Validators.required);
  
      items = new FormControl("", Validators.required);
  
      pharmacy = new FormControl("", Validators.required);
  
      timestamp = new FormControl("", Validators.required);
  
      authorized = new FormControl("", Validators.required);
  


  constructor(private servicePrescription:PrescriptionService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          prescriptionId:this.prescriptionId,
        
    
        
          hospital:this.hospital,
        
    
        
          patient:this.patient,
        
    
        
          doctor:this.doctor,
        
    
        
          items:this.items,
        
    
        
          pharmacy:this.pharmacy,
        
    
        
          timestamp:this.timestamp,
        
    
        
          authorized:this.authorized
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.servicePrescription.getAll()
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
      $class: "com.healchain.network.pharmacy.Prescription",
      
        
          "prescriptionId":this.prescriptionId.value,
        
      
        
          "hospital":this.hospital.value,
        
      
        
          "patient":this.patient.value,
        
      
        
          "doctor":this.doctor.value,
        
      
        
          "items":this.items.value,
        
      
        
          "pharmacy":this.pharmacy.value,
        
      
        
          "timestamp":this.timestamp.value,
        
      
        
          "authorized":this.authorized.value
        
      
    };

    this.myForm.setValue({
      
        
          "prescriptionId":null,
        
      
        
          "hospital":null,
        
      
        
          "patient":null,
        
      
        
          "doctor":null,
        
      
        
          "items":null,
        
      
        
          "pharmacy":null,
        
      
        
          "timestamp":null,
        
      
        
          "authorized":null
        
      
    });

    return this.servicePrescription.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "prescriptionId":null,
        
      
        
          "hospital":null,
        
      
        
          "patient":null,
        
      
        
          "doctor":null,
        
      
        
          "items":null,
        
      
        
          "pharmacy":null,
        
      
        
          "timestamp":null,
        
      
        
          "authorized":null 
        
      
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
      $class: "com.healchain.network.pharmacy.Prescription",
      
        
          
        
    
        
          
            "hospital":this.hospital.value,
          
        
    
        
          
            "patient":this.patient.value,
          
        
    
        
          
            "doctor":this.doctor.value,
          
        
    
        
          
            "items":this.items.value,
          
        
    
        
          
            "pharmacy":this.pharmacy.value,
          
        
    
        
          
            "timestamp":this.timestamp.value,
          
        
    
        
          
            "authorized":this.authorized.value
          
        
    
    };

    return this.servicePrescription.updateAsset(form.get("prescriptionId").value,this.asset)
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

    return this.servicePrescription.deleteAsset(this.currentId)
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

    return this.servicePrescription.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "prescriptionId":null,
          
        
          
            "hospital":null,
          
        
          
            "patient":null,
          
        
          
            "doctor":null,
          
        
          
            "items":null,
          
        
          
            "pharmacy":null,
          
        
          
            "timestamp":null,
          
        
          
            "authorized":null 
          
        
      };



      
        if(result.prescriptionId){
          formObject.prescriptionId = result.prescriptionId;
        }else{
          formObject.prescriptionId = null;
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
      
        if(result.doctor){
          formObject.doctor = result.doctor;
        }else{
          formObject.doctor = null;
        }
      
        if(result.items){
          formObject.items = result.items;
        }else{
          formObject.items = null;
        }
      
        if(result.pharmacy){
          formObject.pharmacy = result.pharmacy;
        }else{
          formObject.pharmacy = null;
        }
      
        if(result.timestamp){
          formObject.timestamp = result.timestamp;
        }else{
          formObject.timestamp = null;
        }
      
        if(result.authorized){
          formObject.authorized = result.authorized;
        }else{
          formObject.authorized = null;
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
      
        
          "prescriptionId":null,
        
      
        
          "hospital":null,
        
      
        
          "patient":null,
        
      
        
          "doctor":null,
        
      
        
          "items":null,
        
      
        
          "pharmacy":null,
        
      
        
          "timestamp":null,
        
      
        
          "authorized":null 
        
      
      });
  }

}
