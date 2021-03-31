import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { RegistroForm } from '../interfaces/registro-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';


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
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map( (resp : any) => {
        
        const {  
              nombre,
              email,
              img,
              google,
              role,
              uid
              } = resp.usuario;

        this.usuario = new Usuario(nombre, email,'', img, google, role, uid);        
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

  login( formData: LoginForm ){
    
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


}
