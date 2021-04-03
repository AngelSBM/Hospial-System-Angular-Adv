import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public ocultarModal : boolean = true;
  public imagenSubir : File;
  

  constructor( public modalImagenService : ModalImagenService,
               public fileUploadService : FileUploadService,
               ) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen( file: File ){
    this.imagenSubir = file;    
  }

  subirImagen(){

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo

    this.fileUploadService.actualizarUsuario(this.imagenSubir, tipo, id)
          .subscribe( resp => {            
            this.cerrarModal();
            Swal.fire('Cambio de imagen', 'Se ha actulizado la imagen con éxito', 'success');
            this.modalImagenService.cambioImagen.emit( resp );
          }, err => {
            Swal.fire('Error', err.error.msg, 'error');
          } )
  }

}
