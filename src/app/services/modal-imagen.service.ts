import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal : boolean =  true;
  public tipo : 'usuarios' | 'medicos' | 'hospitales' ; 
  public id : string; 
  public img : string; 

  public cambioImagen: EventEmitter<string> = new EventEmitter<string>();

  public get ocultarModal() : boolean {
    return this._ocultarModal;
  }
  
  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales' ,
    id: string,
    img: string = 'no-image'
  ){
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    //http://localhost:3000/api/upload/usuarios/ddc4064d-a626-4249-9aad-e845f683.jpeg

    if( img.includes('http') ){
      this.img = img;
    }else {
      this.img = `${ base_url }/upload/${ tipo }/${ img }`;
    }

  }

  cerrarModal(){
    this._ocultarModal = true;
  }

  constructor() { }
}
