import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/model.medico';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor( private http : HttpClient ) {
   }

  
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

  getMedicos(){

    const url = `${ base_url }/medicos`;

    return this.http.get<{ok: boolean, medicos: Medico[]}>( url, this.headers );
  }

  getMedicoById( id: string ){
    const url = `${ base_url }/medicos/${ id }`;

    return this.http.get<{ok: boolean, medico: Medico}>( url, this.headers )
                .pipe(
                  map( resp => resp.medico )
                )
  }

  crearMedico( medico: { nombre: string, hospital: string } ){
    const url = `${ base_url }/medicos`;

    return this.http.post<{ok: boolean, medicoDB: Medico}>( url, medico, this.headers );
  }

  actualizarMedico( medico: Medico ){
    const url = `${ base_url }/medicos/${ medico._id }`;

    return this.http.put( url, medico, this.headers );
  }

  borrarMedico( medico: Medico ){
    const url = `${ base_url }/medicos/${ medico._id }`;

    return this.http.delete( url, this.headers );
  }

}
