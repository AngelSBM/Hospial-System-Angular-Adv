import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RespUsuario } from '../interfaces/resp-usuario.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor( private http: HttpClient ) { }

  actualizarUsuario( 
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales' ,
    id: string   
   ){

    const url = `${ base_url }/upload/${ tipo }/${ id }`;
    const formData = new FormData();
    formData.append('imagen', archivo)

    return this.http.put( url, formData, {
      headers: {
        'x-token': localStorage.getItem('token') || ''
      }
    }).pipe(
      map( (resp: RespUsuario) => {
        if( resp.ok ){
          return resp.nombreArchivo;
        }else {
          console.log(resp.msg);
          return false
        }
      } )
    )

  }

}
