import { Component, OnInit, ViewChild } from '@angular/core';
import { GetSalesDataService } from '../services/getSalesData.service';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { SalesFields } from '../sales/salesFields';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  ELEMENT_DATA: SalesFields[];
  displayedColumns: string[] = ["productID", "productName", "salesQ1", "salesQ2", "salesQ3", "salesQ4", "action"];
  dataSource = new MatTableDataSource<SalesFields>(this.ELEMENT_DATA);
  
  //displayedColumns: string[];
  //dataSource: any [];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private getSalesDataService:GetSalesDataService) {}            
 
  ngOnInit(): void {
    this.getSalesDataService.getSalesData().subscribe(response => {
      //this.displayedColumns = response["column"].map(c => c.header);

      this.dataSource = response["data"];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  public doFilter = (value: string) => {
    console.log('doFilter : ' + value);
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
