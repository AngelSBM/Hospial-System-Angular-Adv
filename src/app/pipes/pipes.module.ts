import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenUrlPipe } from './pipes/imagen-url.pipe';




@NgModule({
  declarations: [ ImagenUrlPipe ],
  imports: [
    CommonModule
  ],
  exports: [
    ImagenUrlPipe
  ]
})
export class PipesModule { }
