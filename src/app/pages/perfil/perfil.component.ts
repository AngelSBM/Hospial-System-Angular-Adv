import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public usuario: Usuario;
  public perfilForm: FormGroup;
  public imagenSubir: File;
  public editarMail: boolean;

  constructor( private fb : FormBuilder,
               private usuarioService : UsuarioService,
               private fileUploadService : FileUploadService) {
          this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
     this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [ this.usuario.email, [Validators.required, Validators.email]]
    });

  }

  actualizarPerfil(){
    this.usuarioService.actualizarUsuario( this.perfilForm.value )
          .subscribe( resp => {
            const { nombre, email } = this.perfilForm.value;

            this.usuario.nombre = nombre;
            this.usuario.email = email;

            Swal.fire('Ajustes', 'Cambios realizados con éxito', 'success');
            console.log(this.usuario);
            
          }, err => {          
            Swal.fire('Error', err.error.msg, 'error')
          } )    
  }


  cambiarImagen( file: File ){
    this.imagenSubir = file;    
  }

  subirImagen(){
    this.fileUploadService.actualizarUsuario(this.imagenSubir, 'usuarios', this.usuario.uid)
          .subscribe( resp => {
            console.log(resp);
            this.usuario.img = resp;
            Swal.fire('Cambio de imagen', 'Se ha actulizado la imagen con éxito', 'success');            
          }, err => {
            Swal.fire('Error', err.error.msg, 'error');
          } )
  }


}
