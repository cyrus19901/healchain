import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { WearableService } from './Wearable.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Wearable',
	templateUrl: './Wearable.component.html',
	styleUrls: ['./Wearable.component.css'],
  providers: [WearableService]
})
export class WearableComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      wearableId = new FormControl("", Validators.required);
  
      name = new FormControl("", Validators.required);
  
      patient = new FormControl("", Validators.required);
  
      summaries = new FormControl("", Validators.required);
  
      authorized = new FormControl("", Validators.required);
  


  constructor(private serviceWearable:WearableService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          wearableId:this.wearableId,
        
    
        
          name:this.name,
        
    
        
          patient:this.patient,
        
    
        
          summaries:this.summaries,
        
    
        
          authorized:this.authorized
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceWearable.getAll()
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
      $class: "com.healchain.network.patient.Wearable",
      
        
          "wearableId":this.wearableId.value,
        
      
        
          "name":this.name.value,
        
      
        
          "patient":this.patient.value,
        
      
        
          "summaries":this.summaries.value,
        
      
        
          "authorized":this.authorized.value
        
      
    };

    this.myForm.setValue({
      
        
          "wearableId":null,
        
      
        
          "name":null,
        
      
        
          "patient":null,
        
      
        
          "summaries":null,
        
      
        
          "authorized":null
        
      
    });

    return this.serviceWearable.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "wearableId":null,
        
      
        
          "name":null,
        
      
        
          "patient":null,
        
      
        
          "summaries":null,
        
      
        
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
      $class: "com.healchain.network.patient.Wearable",
      
        
          
        
    
        
          
            "name":this.name.value,
          
        
    
        
          
            "patient":this.patient.value,
          
        
    
        
          
            "summaries":this.summaries.value,
          
        
    
        
          
            "authorized":this.authorized.value
          
        
    
    };

    return this.serviceWearable.updateAsset(form.get("wearableId").value,this.asset)
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

    return this.serviceWearable.deleteAsset(this.currentId)
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

    return this.serviceWearable.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "wearableId":null,
          
        
          
            "name":null,
          
        
          
            "patient":null,
          
        
          
            "summaries":null,
          
        
          
            "authorized":null 
          
        
      };



      
        if(result.wearableId){
          formObject.wearableId = result.wearableId;
        }else{
          formObject.wearableId = null;
        }
      
        if(result.name){
          formObject.name = result.name;
        }else{
          formObject.name = null;
        }
      
        if(result.patient){
          formObject.patient = result.patient;
        }else{
          formObject.patient = null;
        }
      
        if(result.summaries){
          formObject.summaries = result.summaries;
        }else{
          formObject.summaries = null;
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
      
        
          "wearableId":null,
        
      
        
          "name":null,
        
      
        
          "patient":null,
        
      
        
          "summaries":null,
        
      
        
          "authorized":null 
        
      
      });
  }

}
