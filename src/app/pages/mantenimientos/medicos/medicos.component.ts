import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/model.medico';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos : Medico[] = [];
  referenciaMedicos : Medico[] = [];
  public loading : boolean = true;
  public imgSubs : Subscription;

  constructor( public medicoService: MedicoService,
               public busquedaService: BusquedasService,
               public modalImagenService: ModalImagenService ) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    
    this.imgSubs = this.modalImagenService.cambioImagen
          .pipe( delay(100) )
          .subscribe( img => this.cargarMedicos() );

  }

  cargarMedicos(){
    this.loading = true;
    this.medicoService.getMedicos().subscribe( resp => {
            
      this.medicos = resp.medicos;
      this.referenciaMedicos = resp.medicos
      this.loading = false;
      
    });
  }

  eliminarMedico( medico: Medico ){

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará al médico ${ medico.nombre }`,
      icon:'info',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar.',
    }).then((result) => {
      
      if (result.isConfirmed) {

        this.medicoService.borrarMedico( medico ).subscribe( resp =>  {
          Swal.fire('Eliminado', `El médico ${ medico.nombre } ha sido eliminado correctamente`, 'success');
          this.cargarMedicos();
        }); 
        
      } 

    });

    // this.medicoService.borrarMedico( medico )
    
  }


  buscar( termino: string ){
    
    if( termino.length == 0 ){
      return this.medicos = this.referenciaMedicos;
    }

    this.loading = true;
    this.busquedaService.buscar( 'medicos', termino ).subscribe( resp => {

      this.medicos = resp;
      this.loading = false;
    }, err => {
      console.log(err);
      
    })
  }

  abrirModal( medico: Medico ){
    this.modalImagenService.abrirModal( 'medicos', medico._id, medico.img )
    
  }

}
