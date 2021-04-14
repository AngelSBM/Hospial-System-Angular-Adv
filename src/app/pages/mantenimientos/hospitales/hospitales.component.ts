import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales : Hospital[];
  public referenciaHospitales : Hospital[];
  public cargando : boolean = true;
  private imgSubs: Subscription;

  constructor( public hospitalService : HospitalService,
               public modalImagenService : ModalImagenService,
               public busquedaService : BusquedasService ) { }

  ngOnInit(): void {
    this.cargarHospitales(); 

    this.imgSubs = this.modalImagenService.cambioImagen
          .pipe( delay(100) )
          .subscribe( img => this.cargarHospitales() ); 
  }

  cargarHospitales(){

    this.cargando = true;
    this.hospitalService.getHospitales()
          .subscribe( hospitales => {       
            this.cargando = false;
            this.hospitales = hospitales;
            this.referenciaHospitales = hospitales;
            console.log(this.hospitales);
          });

  }

  guardarCambios( e: Event, hospital: Hospital ){
    e.preventDefault();
    
    this.hospitalService.actualizarHospital( hospital._id, hospital.nombre ).subscribe( resp => {
      Swal.fire('Actualizado', hospital.nombre, 'success');
    })
    
  }

  
  eliminarHospital( e: Event, hospital: Hospital ){
    e.preventDefault();
    
    this.hospitalService.eliminarHospital( hospital._id ).subscribe( resp => {
      Swal.fire('Eliminado', hospital.nombre, 'success');
      this.cargarHospitales();
    })
    
  }

  async abrirSA(){

    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'ingrese el nombre del nuevo hospital',
      input: 'text', 
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    })

    if( value.trim().length > 0 ){
      this.hospitalService.crearHospital( value )
            .subscribe( (resp: any) => { 

              this.hospitales.push( resp.hospital );
              

            })
    }
    

  }

  abrirModal( hospital: Hospital ){

    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);

  }

  buscar( termino: string ){
    
    if( termino.length === 0 ){
      return this.hospitales = this.referenciaHospitales;
    }


    this.busquedaService.buscar( 'hospitales', termino )
          .subscribe( (resp: any ) => {
            console.log(resp);
            this.hospitales = resp
          });

  }

}
