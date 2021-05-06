import { Component, OnInit, ViewChild } from '@angular/core';

import { GetSalesData } from '../services/getSalesData.service';
import { CommonFunctions } from '../services/commonFunctions.service';
import { LoginAndToken } from "../services/loginAndToken.service";

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { SalesFields } from 'src/app/sales/salesFields';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  // all machine Data
  machineDataArr: any;
  
  // machine data 
  //ELEMENT_DATA: MachineDetailsFields[];
  //displayedColumns: string[] = ["machineIdentifier", "processName", "machineMakeName", "purchaseDate", "inspectedDayAndTime", "action"];
  //dataSource = new MatTableDataSource<MachineDetailsFields>(this.ELEMENT_DATA);

  // maretial table sort and pagination
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  //constructor(private machineDataService:GetMachineData, 
              //private router: Router,
              //private commonFunctions:CommonFunctions,
              //private loginAndToken: LoginAndToken) {}

  constructor() {}            

  ngOnInit(): void {
    //if(!this.loginAndToken.isAuthTokenValid()) {
      //this.loginAndToken.logOut();
    //} else {
      //this.commonFunctions.sratrSpinner();
      //this.machineDataService.getAllMachineData().subscribe(response => {
        //this.machineDataArr = response;
        //console.log("Machine all data : " + JSON.stringify(response));
        
        //this.dataSource.data = response as MachineDetailsFields[];
        //this.dataSource.sort = this.sort;
        //this.dataSource.paginator = this.paginator;
        //this.commonFunctions.stopSpinner();
      //});
  }

  // get Single Machine Details
  /*getSingleMachineDetails(machineID) {
    this.commonFunctions.sratrSpinner();
    this.machineDataService.getSingleMachineData(machineID).subscribe(response => {
      this.machineSingleDataArr = [];
      this.machineSingleDataArr = response;
      console.log("m data : " + JSON.stringify(response));
    });
    this.commonFunctions.stopSpinner();
  }*/
  
  // delete Machine
  /*deleteMachine(machineId) {
    this.commonFunctions.sratrSpinner();
    if (confirm("Do you want to delete the machine ?")) {
      this.machineDataService.deleteMachine(machineId).subscribe(response => {
        this.commonFunctions.stopSpinner();
        this.commonFunctions.showSuccess("Success","Deleted");
        this.ngOnInit();
      });
    } else {
      this.commonFunctions.stopSpinner();
    }
  }*/

  // inspect machine
  /*inspectMachine(machineIdentifier) {
    this.machineDataService.storeMachineIdentifierID(machineIdentifier);
    this.router.navigateByUrl('machine-quality-inspection');
  }*/

}
