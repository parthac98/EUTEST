import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetSalesData {

  // constructor
  constructor(private httpClient: HttpClient) { }

  private _url = "this.env.apiUrl";

  getAllMachineData() {
    return this.httpClient.get(this._url);
  }

}