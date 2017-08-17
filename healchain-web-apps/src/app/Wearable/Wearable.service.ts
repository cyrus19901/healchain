import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Wearable } from '../com.healchain.network.patient';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class WearableService {

	
		private NAMESPACE: string = 'Wearable';
	



    constructor(private dataService: DataService<Wearable>) {
    };

    public getAll(): Observable<Wearable[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Wearable> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Wearable> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Wearable> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Wearable> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
