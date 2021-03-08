import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styles: [
  ]
})
export class GraficaComponent {

  labels1: string[] = ['Enfermedades leves', 'Saranana', 'Ébola'];

  public data1 = [
    [50, 500, 200],
  ];

}
