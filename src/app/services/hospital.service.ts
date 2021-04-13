import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor( public http: HttpClient ) { }

    
  public get token() : string {
    return localStorage.getItem('token');
  }
  

  public get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  getHospitales(){
    return this.http.get( `${ base_url }/hospitales` )
                .pipe(
                  map( (resp: { ok: boolean, hospitales: Hospital[] } ) => resp.hospitales )
                )
  }

}
