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

  lineChartOptions: (ChartOptions & { annotation: any });
  lineChartColors: Color[];
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];

  time: any[] = [];
  date: any[] = [];
  loading = false;


  constructor(private datos: DatosService, private exportExcelService: ExportexcelService) {
    this.datos.getDesktopLimit().subscribe(
      res => {
        this.loading = false;
        this.data = [res];
        this.dataSource = this.data[0];
        this.getFilterGr();
        this.getFilterTa();
      }
    )
  }

  //Inicializacion del modulo 
  ngOnInit() {
    this.loading = true;
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
    for (let entry of this.dataGraphic) {
      this.date.push(moment(entry.created).format('DD-MM-YYYY HH:mm'))
      this.time.push(entry.total_load_time * 0.001)
    }

    this.lineChartData = [{ data: this.time, label: 'Time Render' }];
    this.lineChartLabels = this.date;
    this.loading = false
  }



  getDataNow() {
    this.loading = true;
    this.datos.getDataDesktopNow().subscribe(
      res => {
        this.loading = false;
        location.reload();
      }
    )
  }


  exportAsXLSX(): void {
    this.exportExcelService.exportAsExcelFile(this.dataTble, 'Performace');
  }

}

