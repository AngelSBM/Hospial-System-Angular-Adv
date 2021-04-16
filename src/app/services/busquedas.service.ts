import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http : HttpClient ) { }

  public get token() : string {
    return localStorage.getItem('token') || '';
  }

  busquedaGlobal( termino: string ){

    return this.http.get<any[]>(`${ base_url }/todo/${ termino }`, {
      headers: {
        'x-token': this.token
      }
    }); 

  }

  buscar( tipo: string, termino: string = '' ){

    return this.http.get<any[]>(`${ base_url }/todo/colecciones/${ tipo }/${ termino }`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( ( resp:any ) => resp.resultados )
    )

  }


}
