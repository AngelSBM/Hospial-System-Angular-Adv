import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

//Recursos del entorno de desarrollo
import { environment } from 'src/environments/environment';

//Modelos
import { Usuario } from '../models/usuario.model';

//Interfaces
import { RegistroForm } from '../interfaces/registro-form.interface';
import { CargarUsuarios } from '../interfaces/login-form.interface';


const base_url = environment.base_url;
declare const gapi:any;


@Injectable(  {
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone  ) { 
                 
                
                this.googleInit();
  }

  
  public get token() : string {
    return localStorage.getItem('token') || '';
  }
  

  
  googleInit(){

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '733061079466-i50s90vt0k3aca40h76gfr1m4krog9s8.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
      });

        
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');

    this.auth2.signOut().then( () => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login'); 
      } )
    });

  }

  
  validarToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp : any) => {
        
        const { email, google, nombre, role, img = '', uid } = resp.usuario;
        this.usuario = new Usuario( nombre, email, '', img, google, role, uid );     
        localStorage.setItem('token', resp.token);
        
        return true;

      }),
      catchError( error => of(false) )
    )

  }

  crearUsuario( formData: RegistroForm ){
    
    return this.http.post(`${ base_url }/usuarios`, formData )
                .pipe(
                  tap( ( resp: any ) => {
                      localStorage.setItem('token', resp.token )                    
                  } )
                )
        
  }


  actualizarUsuario( data: { email: string, nombre: string, role } ){

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${ base_url }/usuarios/${ this.usuario.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    } )

  }


  login( formData: any ){
    
    return this.http.post(`${ base_url }/login`, formData )
                .pipe(
                  tap( ( resp: any ) => {
                      localStorage.setItem('token', resp.msg)                    
                  } )
                )
        
  }


  loginGoogle( token ){
    
    return this.http.post(`${ base_url }/login/google`, { token } )
                .pipe(
                  tap( ( resp: any ) => {

                      localStorage.setItem('token', resp.token);
                                                                                  
                  } )
                )
        
  }

  
  getUsuarios( desde: number = 0 ){
    return this.http.get<CargarUsuarios>(`${ base_url }/usuarios?desde=${ desde }`, {
      headers: {
        'x-token': this.token
      }
    })
  }


  eliminarUsuario( usuario: Usuario ){
    
    console.log('eliminando');
    const url = `${ base_url }/usuarios/${ usuario.uid }`;

    return this.http.delete( url, {
      headers: {
        'x-token': this.token
      }
    });
          
  }


  guardarUsuario( usuario: Usuario ){  

    return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, {
      headers: {
        'x-token': this.token
      }
    } )

  } 


}
