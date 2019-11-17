import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';


@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styles: []
})
export class GraphicComponent {

  time: any[] = [];
  date: any[] = [];

  lineChartLegend = true;
  lineChartType = 'line';
  lineChartPlugins = [];

  @Input('datasets') lineChartData: ChartDataSets[] = [];
  @Input('labels') lineChartLabels: Label[];
  // @Input('labels') PRUEBA: Label[];


  public lineChartOptions: (ChartOptions & { annotation: any }) = {

    responsive: true,

    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno',

          }
        },
      ],
    }
  };

  public lineChartColors: Color[] = [
    { // blue
      backgroundColor: 'rgba(213,248,236,0.3)',
      borderColor: 'rgba(74,224,218,1)',
      pointBackgroundColor: 'rgba(74,224,218,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },  { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(253, 137, 162,1)',
      pointBackgroundColor: 'rgba(253, 137, 162,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

}
