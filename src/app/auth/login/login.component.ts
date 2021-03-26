import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


declare const gapi:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})

export class LoginComponent implements OnInit  {

  public auth2: any;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [Validators.required, Validators.email] ],
    password: ['', Validators.required ], 
    remember: [ false ]   
  });


  constructor( private router         : Router,
               private fb             : FormBuilder,
               private usuarioService : UsuarioService,
               private ngZone         : NgZone) { }


  ngOnInit(): void {
    this.renderButton();
  }

    

  login(){
      // console.log(this.loginForm.value);
      this.usuarioService.login( this.loginForm.value )
          .subscribe( resp => {
            
            if( this.loginForm.get('remember').value ){
              localStorage.setItem('email', this.loginForm.get('email').value )
            }else {
              localStorage.removeItem('email');
            }

            this.router.navigateByUrl('/');

          }, (err) => {
            //Si sucede un error
            Swal.fire('error', err.error.msg, 'error');   
            console.log(err.error.msg);
                     
          } );     
          
  }
  


  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    
    this.startApp();
  }


  startApp () {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '733061079466-i50s90vt0k3aca40h76gfr1m4krog9s8.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  }

  attachSignin(element) {

      this.auth2.attachClickHandler(element, {},
          (googleUser) => {
            const id_token = googleUser.getAuthResponse().id_token;
            // this.usuarioService.loginGoogle( id_token )            

            this.usuarioService.loginGoogle( id_token )
              .subscribe( resp => {
                //Navega al Dashboard
                
                this.ngZone.run( () => {
                  this.router.navigateByUrl('/');
                } );
              } )
                          

          }, err => {
            alert(JSON.stringify(err, undefined, 2));
          });
    }


}
