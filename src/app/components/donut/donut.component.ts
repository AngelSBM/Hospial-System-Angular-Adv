import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Colors } from 'ng2-charts';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent {

  @Input() titulo: string = 'Sin titulo';

  @Input() labels: Label[] = ['Enfermedades leves', 'Saranana', 'Ébola'];
  @Input() data1: MultiDataSet = [
    [50, 500, 200],
  ];

  public doughnutChartType: ChartType = 'doughnut';


  public colors: Colors[] = [
    { backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ] }
  ]
  
}
