import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { OpConsultService } from './OpConsult.service';
import 'rxjs/add/operator/toPromise';
import { StripPipePatient } from '../strip.pipe';
import { StripPipeDoctor } from '../strip.pipe';
import { StripPipeHospital, StripPipePharmacy } from '../strip.pipe';
@Component({
	selector: 'app-OpConsult',
	templateUrl: './OpConsult.component.html',
	styleUrls: ['./OpConsult.component.css'],
  providers: [OpConsultService]
})
export class OpConsultComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      consultId = new FormControl("", Validators.required);
  
      hospital = new FormControl("", Validators.required);
  
      doctors = new FormControl("", Validators.required);
  
      patient = new FormControl("", Validators.required);
  
      labTest = new FormControl("", Validators.required);
  
      prescription = new FormControl("", Validators.required);
  
      dignosisUpdates = new FormControl("", Validators.required);
  


  constructor(private serviceOpConsult:OpConsultService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          consultId:this.consultId,
        
    
        
          hospital:this.hospital,
        
    
        
          doctors:this.doctors,
        
    
        
          patient:this.patient,
        
    
        
          labTest:this.labTest,
        
    
        
          prescription:this.prescription,
        
    
        
          dignosisUpdates:this.dignosisUpdates
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceOpConsult.getAll()
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
      $class: "com.healchain.network.hospital.OpConsult",
      
        
          "consultId":this.consultId.value,
        
      
        
          "hospital":this.hospital.value,
        
      
        
          "doctors":this.doctors.value,
        
      
        
          "patient":this.patient.value,
        
      
        
          "labTest":this.labTest.value,
        
      
        
          "prescription":this.prescription.value,
        
      
        
          "dignosisUpdates":this.dignosisUpdates.value
        
      
    };

    this.myForm.setValue({
      
        
          "consultId":null,
        
      
        
          "hospital":null,
        
      
        
          "doctors":null,
        
      
        
          "patient":null,
        
      
        
          "labTest":null,
        
      
        
          "prescription":null,
        
      
        
          "dignosisUpdates":null
        
      
    });

    return this.serviceOpConsult.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "consultId":null,
        
      
        
          "hospital":null,
        
      
        
          "doctors":null,
        
      
        
          "patient":null,
        
      
        
          "labTest":null,
        
      
        
          "prescription":null,
        
      
        
          "dignosisUpdates":null 
        
      
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
      $class: "com.healchain.network.hospital.OpConsult",
      
        
          
        
    
        
          
            "hospital":this.hospital.value,
          
        
    
        
          
            "doctors":this.doctors.value,
          
        
    
        
          
            "patient":this.patient.value,
          
        
    
        
          
            "labTest":this.labTest.value,
          
        
    
        
          
            "prescription":this.prescription.value,
          
        
    
        
          
            "dignosisUpdates":this.dignosisUpdates.value
          
        
    
    };

    return this.serviceOpConsult.updateAsset(form.get("consultId").value,this.asset)
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

    return this.serviceOpConsult.deleteAsset(this.currentId)
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

    return this.serviceOpConsult.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "consultId":null,
          
        
          
            "hospital":null,
          
        
          
            "doctors":null,
          
        
          
            "patient":null,
          
        
          
            "labTest":null,
          
        
          
            "prescription":null,
          
        
          
            "dignosisUpdates":null 
          
        
      };



      
        if(result.consultId){
          formObject.consultId = result.consultId;
        }else{
          formObject.consultId = null;
        }
      
        if(result.hospital){
          formObject.hospital = result.hospital;
        }else{
          formObject.hospital = null;
        }
      
        if(result.doctors){
          formObject.doctors = result.doctors;
        }else{
          formObject.doctors = null;
        }
      
        if(result.patient){
          formObject.patient = result.patient;
        }else{
          formObject.patient = null;
        }
      
        if(result.labTest){
          formObject.labTest = result.labTest;
        }else{
          formObject.labTest = null;
        }
      
        if(result.prescription){
          formObject.prescription = result.prescription;
        }else{
          formObject.prescription = null;
        }
      
        if(result.dignosisUpdates){
          formObject.dignosisUpdates = result.dignosisUpdates;
        }else{
          formObject.dignosisUpdates = null;
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
      
        
          "consultId":null,
        
      
        
          "hospital":null,
        
      
        
          "doctors":null,
        
      
        
          "patient":null,
        
      
        
          "labTest":null,
        
      
        
          "prescription":null,
        
      
        
          "dignosisUpdates":null 
        
      
      });
  }

}
