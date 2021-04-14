import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Pipe({
  name: 'imagenUrlHospital'
})
export class ImagenUrlHospitalPipe implements PipeTransform {

  transform( url : string ): string {
    
    if( !url ){

      return `${ base_url }/upload/hospitales/no-image.png`;;

    } else if ( url.includes('http') ){

      return url;

    }else if( url ){

      return `${ base_url }/upload/hospitales/${ url }`;

    }else{

      return  
       
    }

  }

}
