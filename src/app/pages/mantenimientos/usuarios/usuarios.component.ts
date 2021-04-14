import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public total : number = 0;
  public usuarios : Usuario[] = [];
  public usuariosTemp : Usuario[] = [];

  public desde : number = 0;
  public cargando : boolean = true; 
  public imgSubs : Subscription;


  constructor( private usuariosService: UsuarioService,
               private busquedasService: BusquedasService,
               private modalImagenService: ModalImagenService) { }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
      this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.cambioImagen
          .pipe( delay(100) )
          .subscribe( img => this.cargarUsuarios() ); 

  }

  cargarUsuarios(){
    this.cargando = true; 
    this.usuariosService.getUsuarios( this.desde )
          .subscribe( ( { usuarios, total } ) => {
            
            this.total = total;
            this.usuarios = usuarios;
            this.usuariosTemp = usuarios;            
            this.cargando = false;
            
          } );
  }

  cambiarPagina( valor : number ){
    this.desde += valor;
        
    if( this.desde < 0 ){
      this.desde = 0
    }else if( this.desde > this.total ){
      this.desde -= valor;
    }

    this.cargarUsuarios();

  }

  buscar( termino: string ){

    if( termino.length === 0 ){
      return this.usuarios =  this.usuariosTemp;
    }

    this.busquedasService.buscar( 'usuarios', termino )
          .subscribe( (resp: any) => {
            console.log(resp);
            
            
          } )
    
  }



  
  borrarUsuario( usuario: Usuario ){
   
    if( usuario.uid === this.usuariosService.usuario.uid ){
      return Swal.fire('ERROR', 'Usted no puede borrarse a sí mismo', 'error');
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Usted está a punto de eliminar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.usuariosService.eliminarUsuario( usuario )
              .subscribe( resp => {

                Swal.fire('usuario borrado', `${ usuario.nombre } fue eliminado correctamente`, 'info')
                this.cargarUsuarios();
              })

      }
    })
    
  }


  cambiarRole( usuario: Usuario ) {

    this.usuariosService.guardarUsuario( usuario )
          .subscribe( resp => {
            
            Swal.fire('Usuario actualizado', `El usuario ${ usuario.nombre } ha cambiado de ROLE`, 'success');
            
          } )
     

  }


  abrirModal( usuario: Usuario ){
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }


}
