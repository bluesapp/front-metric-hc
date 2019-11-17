import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DatosService {

  API_URI = 'http://performanceatg.azurewebsites.net';
  
  

  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get(`${this.API_URI}/api/psidb/list`);
  }
  
  getDesktopLimit() {
    return this.http.get(`${this.API_URI}/api/psidb/getdesktop`);
  }

  getMobileLimit() {
    return this.http.get(`${this.API_URI}/api/psidb/getmobile`);
  }
  getDevicesLimit() {
    return this.http.get(`${this.API_URI}/api/psidb/getdevices`);
  }

  getDesktopFilter(fromDate, toDate) {
    return this.http.get(`${this.API_URI}/api/psidb/getdesktop/${fromDate},${toDate}`);
  }

  getMobileFilter(fromDate, toDate) {
    return this.http.get(`${this.API_URI}/api/psidb/getmobile/${fromDate},${toDate}`);
  }
  getDevicesFilter(fromDate, toDate) {
    return this.http.get(`${this.API_URI}/api/psidb/getdevices/${fromDate},${toDate}`);
  }

  getDataMobileNow() {
    return this.http.get(`${this.API_URI}/api/psi/mobile`);

  }
  getDataDesktopNow() {
    return this.http.get(`${this.API_URI}/api/psi/desktop`);

  }
  
}
