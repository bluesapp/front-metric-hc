import { Component, ViewChild, OnInit } from '@angular/core';
import { DatosService } from '../../services/datos.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';

export interface PeriodicElement {
  device?: string;
  platform?: string;
  locale?: string;
  first_render_time?: number;
  total_load_time?: number;
  total_size?: number;
  load_without_js?: number;
  request?: number;
  score?: number
  created?: string;
  id?: number;
}

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {

  displayedColumns = ['first_render_time', 'total_load_time', 'total_size', 'request', 'device', 'locale', 'platform', 'score', 'created'];
  data: any[];
  dataSource: PeriodicElement[];
  fromDate = '';
  toDate = '';
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions: (ChartOptions & { annotation: any });
  lineChartColors: Color[];
  lineChartLegend = true;
  lineChartType = 'line';
  time: any[] = [];
  date: any[] = [];
  loading = false;
  barChartData = false;

  constructor(private datos: DatosService) {
  }

  //Inicializacion del modulo 
  ngOnInit() {
    this.loading = true;
    this.datos.getMobileLimit().subscribe(
      res => {
        this.loading = false;
        this.data = [res];
        this.dataSource = this.data[0];
        // console.log(this.dataSource)
        this.barChartData = true;

        this.getFilter(this.dataSource);
      }
    )
  }



  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  // Aplicar filtros de fechas
  applyFilter() {
    this.loading = true;
    this.time = [];
    this.date = [];

    this.fromDate = this.filterForm.get('fromDate').value;
    this.toDate = this.filterForm.get('toDate').value;
    let a = moment(this.fromDate).format('YYYY-MM-DD');
    let b = moment(this.toDate).format('YYYY-MM-DD');

    this.datos.getMobileFilter(a, b).subscribe(
      res => {
        this.data = [res]
        this.dataSource = this.data[0];
        this.getFilter(this.dataSource);
      }
    )

  }




  getFilter(data) {

    data.sort((a, b) => a.id - b.id);
    for (let entry of data) {
      this.time.push(entry.total_load_time * 0.001)
      this.date.push(moment(entry.created).format('DD-MM-YYYY HH:mm'))
    }

    this.lineChartData = [{ data: this.time, label: 'Time Render' }]
    this.lineChartLabels = this.date;
    this.lineChartOptions = {
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
              content: 'LineAnno'
            }
          },
        ],
      },
    };

    this.lineChartColors = [
      { // blue
        backgroundColor: 'rgba(213,248,236,0.3)',
        borderColor: 'rgba(74,224,218,1)',
        pointBackgroundColor: 'rgba(74,224,218,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
    this.loading = false;
  }


  getDataNow() {
    this.loading = true;
    this.datos.getDataMobileNow().subscribe(
      res => {
        this.loading = false;
        location.reload();
      }
    )

  }
}
