import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { LabTest } from '../com.healchain.network.lab';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class LabTestService {

	
		private NAMESPACE: string = 'LabTest';
	



    constructor(private dataService: DataService<LabTest>) {
    };

    public getAll(): Observable<LabTest[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<LabTest> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<LabTest> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<LabTest> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<LabTest> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
