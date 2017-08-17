import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Admit } from '../com.healchain.network.hospital';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class AdmitService {

	
		private NAMESPACE: string = 'Admit';
	



    constructor(private dataService: DataService<Admit>) {
    };

    public getAll(): Observable<Admit[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Admit> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Admit> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Admit> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Admit> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
