import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../services/datos.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { PeriodicElement } from '../../models/periodic-element';

import { ExportexcelService } from '../../services/exportexcel.service';



@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.scss']
})
export class PruebasComponent implements OnInit {

  data: any[] = [];
  dataGraphic: any[];
  dataTble: any[] = [];

  dataSource: PeriodicElement[] = [];
  fromDate = '';
  toDate = '';

  // lineChartOptions: (ChartOptions & { annotation: any });
  // lineChartColors: Color[];

  lineChartLabels: Label[];
  lCDtimeTLT: ChartDataSets[];
  lCDtimeFLT: ChartDataSets[];
  lCDtimeWJT: ChartDataSets[];
  lCDtotalSize: ChartDataSets[];
  lCDrequests: ChartDataSets[];
  lCDscore: ChartDataSets[];




  timeTLT: any[] = [];
  timeFLT: any[] = [];
  timeWJT: any[] = [];
  totalSize: any[] = [];
  requests: any[] = [];
  score: any[] = [];

  date: any[] = [];
  loading = false;


  constructor(private datos: DatosService, private exportExcelService: ExportexcelService) {

  }

  //Inicializacion del modulo 
  ngOnInit() {
    this.timeTLT = [];
    this.date = [];
    this.datos.getDesktopLimit().subscribe(
      res => {
        this.loading = false;
        this.data = [res];
        this.dataSource = this.data[0];
        this.getFilterGr();
        this.getFilterTa();
      }
    )
    this.loading = true;
  }

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  // Aplicar filtros de fechas

  applyFilter() {
    this.loading = true;
    this.timeTLT = [];
    this.date = [];

    this.fromDate = this.filterForm.get('fromDate').value;
    this.toDate = this.filterForm.get('toDate').value;
    let a = moment(this.fromDate).format('YYYY-MM-DD');
    let b = moment(this.toDate).format('YYYY-MM-DD');

    this.datos.getDesktopFilter(a, b).subscribe(
      res => {
        this.data = [res]
        this.dataSource = this.data[0];
        this.getFilterGr();
        this.getFilterTa();
      }
    )

  }

  getFilterTa() {
    this.dataTble = this.dataSource.sort((a, b) => b.id - a.id);
    this.loading = false
  }


  getFilterGr() {
    this.dataGraphic = this.dataSource.sort((a, b) => a.id - b.id);
    console.log(this.dataGraphic);

    for (let entry of this.dataGraphic) {
      this.date.push(moment(entry.created).format('DD-MM-YYYY HH:mm'))
      this.timeTLT.push(entry.total_load_time * 0.001)
      this.timeFLT.push(entry.first_render_time * 0.001)
      this.timeWJT.push(entry.load_without_js * 0.001)
      this.totalSize.push(entry.total_size * 0.000001);
      this.requests.push(entry.request);
      this.score.push(entry.score * 100);
    }


    this.lineChartLabels = this.date;
    this.lCDtimeTLT = [{ data: this.timeTLT, label: 'Total Render' }];
    this.lCDtimeFLT = [{ data: this.timeFLT, label: 'First Render' }];
    this.lCDtimeWJT = [{ data: this.timeWJT, label: 'W. JS Render' }];
    this.lCDtotalSize = [{ data: this.totalSize, label: 'Total Sizes mb' }];
    this.lCDrequests = [{ data: this.requests, label: 'Requests' }];
    this.lCDscore = [{ data: this.score, label: 'Score %' }];


    this.loading = false
  }



  getDataNow() {
    this.loading = true;
    this.datos.getDataDesktopNow().subscribe(
      res => {
        setTimeout(() => {
          console.log('Test');
          this.ngOnInit();
        }, 500);

        this.loading = false;
        // location.reload();
      }
    )
  }


  exportAsXLSX(): void {
    this.exportExcelService.exportAsExcelFile(this.dataTble, 'Performace');
  }

}

