import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PeriodicElement } from '../../models/periodic-element';
import { MatTableDataSource } from '@angular/material';



@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  displayedColumns = ['total_load_time', 'first_render_time', 'whitout_js', 'total_size', 'request', 'device', 'locale', 'platform', 'score', 'created'];
  @Input() dataSource: PeriodicElement[];
  dataSources = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  
  

  constructor() {

  }

  //Inicializacion del modulo 
  ngOnInit() {
  this.dataSources = new MatTableDataSource<PeriodicElement>(this.dataSource);

    this.dataSources.paginator = this.paginator;
    console.log(this.dataSources.paginator);
    
  }


}
