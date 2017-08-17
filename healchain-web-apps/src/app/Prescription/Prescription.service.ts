import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Prescription } from '../com.healchain.network.pharmacy';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class PrescriptionService {

	
		private NAMESPACE: string = 'Prescription';
	



    constructor(private dataService: DataService<Prescription>) {
    };

    public getAll(): Observable<Prescription[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Prescription> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Prescription> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Prescription> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Prescription> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
