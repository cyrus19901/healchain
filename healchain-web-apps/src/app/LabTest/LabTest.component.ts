import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LabTestService } from './LabTest.service';
import { StripPipePatient } from '../strip.pipe';
import { StripPipeDoctor } from '../strip.pipe';
import { StripPipeHospital } from '../strip.pipe';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-LabTest',
	templateUrl: './LabTest.component.html',
	styleUrls: ['./LabTest.component.css'],
  providers: [LabTestService]
})
export class LabTestComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      testId = new FormControl("", Validators.required);
  
      hospital = new FormControl("", Validators.required);
  
      patient = new FormControl("", Validators.required);
  
      doctor = new FormControl("", Validators.required);
  
      testReport = new FormControl("", Validators.required);
  
      timestamp = new FormControl("", Validators.required);
  
      authorized = new FormControl("", Validators.required);
  


  constructor(private serviceLabTest:LabTestService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          testId:this.testId,
        
    
        
          hospital:this.hospital,
        
    
        
          patient:this.patient,
        
    
        
          doctor:this.doctor,
        
    
        
          testReport:this.testReport,
        
    
        
          timestamp:this.timestamp,
        
    
        
          authorized:this.authorized
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceLabTest.getAll()
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
      $class: "com.healchain.network.lab.LabTest",
      
        
          "testId":this.testId.value,
        
      
        
          "hospital":this.hospital.value,
        
      
        
          "patient":this.patient.value,
        
      
        
          "doctor":this.doctor.value,
        
      
        
          "testReport":this.testReport.value,
        
      
        
          "timestamp":this.timestamp.value,
        
      
        
          "authorized":this.authorized.value
        
      
    };

    this.myForm.setValue({
      
        
          "testId":null,
        
      
        
          "hospital":null,
        
      
        
          "patient":null,
        
      
        
          "doctor":null,
        
      
        
          "testReport":null,
        
      
        
          "timestamp":null,
        
      
        
          "authorized":null
        
      
    });

    return this.serviceLabTest.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "testId":null,
        
      
        
          "hospital":null,
        
      
        
          "patient":null,
        
      
        
          "doctor":null,
        
      
        
          "testReport":null,
        
      
        
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
      $class: "com.healchain.network.lab.LabTest",
      
        
          
        
    
        
          
            "hospital":this.hospital.value,
          
        
    
        
          
            "patient":this.patient.value,
          
        
    
        
          
            "doctor":this.doctor.value,
          
        
    
        
          
            "testReport":this.testReport.value,
          
        
    
        
          
            "timestamp":this.timestamp.value,
          
        
    
        
          
            "authorized":this.authorized.value
          
        
    
    };

    return this.serviceLabTest.updateAsset(form.get("testId").value,this.asset)
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

    return this.serviceLabTest.deleteAsset(this.currentId)
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

    return this.serviceLabTest.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "testId":null,
          
        
          
            "hospital":null,
          
        
          
            "patient":null,
          
        
          
            "doctor":null,
          
        
          
            "testReport":null,
          
        
          
            "timestamp":null,
          
        
          
            "authorized":null 
          
        
      };



      
        if(result.testId){
          formObject.testId = result.testId;
        }else{
          formObject.testId = null;
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
      
        if(result.testReport){
          formObject.testReport = result.testReport;
        }else{
          formObject.testReport = null;
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
      
        
          "testId":null,
        
      
        
          "hospital":null,
        
      
        
          "patient":null,
        
      
        
          "doctor":null,
        
      
        
          "testReport":null,
        
      
        
          "timestamp":null,
        
      
        
          "authorized":null 
        
      
      });
  }

}
