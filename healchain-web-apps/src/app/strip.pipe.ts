import { Pipe, PipeTransform } from '@angular/core';
/*
 * pipe
*/
@Pipe({name: 'strippatient'})
export class StripPipePatient implements PipeTransform {
  transform(value: string) {
    return  value.replace("resource:com.healchain.network.patient.Patient#"," ");
    //return res;
  }
}

@Pipe({name: 'striphospital'})
export class StripPipeHospital implements PipeTransform {
  transform(value: string) {
    return  value.replace("resource:com.healchain.network.hospital.Hospital#"," ");
    //return res;
  }
}

@Pipe({name: 'stripdoctor'})
export class StripPipeDoctor implements PipeTransform {
  transform(value: string) {
    return  value.replace("resource:com.healchain.network.hospital.Doctor#"," ");
    //return res;
  }
}


@Pipe({name: 'strippharmacy'})
export class StripPipePharmacy implements PipeTransform {
  transform(value: string) {
    return  value.replace("resource:com.healchain.network.pharmacy.Pharmacy#"," ");
    //return res;
  }
}
