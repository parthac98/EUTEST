import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetSalesDataService {

  constructor(private http: HttpClient) { }

  private _url: string = "/assets/data/potato_sales.json";

  getSalesData() {
    return this.http.get(this._url);
  }

}