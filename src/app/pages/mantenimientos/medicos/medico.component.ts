import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/model.medico';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado: Medico;
  public hospitalSeleccionado: Hospital;

  constructor( private fb: FormBuilder,
               private hospitalService: HospitalService,
               private medicoService: MedicoService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({ id }) => this.cargarMedico( id ) );

    // this.medicoService.getMedicoById(  )

    this.medicoForm =  this.fb.group({
      nombre: ['', Validators.required],
      hid: ['', Validators.required],
    });

    this.cargarHospitales();

    this.medicoForm.get('hid').valueChanges 
          .subscribe( hospitalId => {                            
            this.hospitalSeleccionado = this.hospitales.find( h => h._id == hospitalId );                                    
          } );

  }

  cargarMedico( id: string ){

    if( id === 'nuevo' ){
      return;
    }

    this.medicoService.getMedicoById( id )
        .pipe(
          delay(100)
        )
        .subscribe( m => {

          if( !m ){
            this.router.navigateByUrl(`/dashboard/medicos`);
          }

          const { nombre, hospital: { _id } } = m;              
          this.medicoSeleccionado = m;
          this.medicoForm.setValue({ nombre, hid: _id });
                    
        })

  }

  cargarHospitales(){

    this.hospitalService.getHospitales()
          .subscribe( ( hospitales ) => {
            this.hospitales = hospitales;
            
          });

  }

  guardarMedico(){

    if( this.medicoSeleccionado ){
      //Actualizar medico
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id

      }

      this.medicoService.actualizarMedico( data )
            .subscribe( resp => {
              Swal.fire('Actualizado', 'Médico actualizado', 'success');

              console.log(resp);
              
            });

    }else {
      //Crear Medico
      const { nombre } = this.medicoForm.value
      console.log( this.medicoForm.value);
      this.medicoService.crearMedico( this.medicoForm.value )
          .subscribe( resp => {
            console.log(resp);
            Swal.fire('Creado', `Médico ${ nombre } creado`, 'success');
            this.router.navigateByUrl(`/dashboard/medicos/${ resp.medicoDB._id }`);
          })
    }

    

  } 

}
