import { Component, OnInit } from '@angular/core';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import * as CanvasJS from 'src/assets/js/canvasjs.min.js';

import { GetAllProductionSchedule } from '../services/getAllProductionSchedule.service';
import { CommonFunctions } from '../services/commonFunctions.service';
import { LoginAndToken } from "../services/loginAndToken.service";

@Component({
  selector: 'app-shift-management',
  templateUrl: './shift-management.component.html',
  styleUrls: ['./shift-management.component.css']
})
export class ShiftManagementComponent implements OnInit {

  // variable to hold allProductionSchedule responce data
  allProductionSchedule: any;
  
  // weekDayArray
  weekDayArray = ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // shiftTypeArr
  shiftTypeArr = ['PRODUCTION SHIFT', 'OFF SHIFT', 'HOLIDAY SHIFT', 'NO PRODUCTION SHIFT', 'MAINTENANCE SHIFT'];
  
  // month name array
  monthNameArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // current year
  currentYear = (new Date()).getFullYear();

  // current month
  currentMonth = (new Date()).getMonth();
  
  // dataLabel
  dataLabel = "";

  // constructor
  constructor(private allProductionDataService:GetAllProductionSchedule, 
              private commonFunctions:CommonFunctions,
              private loginAndToken: LoginAndToken) { }

  ngOnInit(): void {
    if(!this.loginAndToken.isAuthTokenValid()) {
      this.loginAndToken.logOut();
    } else {
      this.commonFunctions.sratrSpinner();
      this.allProductionDataService.getPosts(this.currentYear, this.currentMonth+1).subscribe(response => {
        
        this.allProductionSchedule = this.dataRestructureing(response);
        
        this.commonFunctions.stopSpinner();
      });

      // create graph current month
      this.createCurrentMonthGraph();

      this.dataLabel = "";
    }  
  }
  
  // function to add fav and add to cart value to the responce JSON
  dataRestructureing(response){
    for (let objs of response) {
      objs["update"] = true;
      objs["save"] = false;
    }

    return response;
  }

  // update shift
  updateShift(id) {
    this.toggleUpdateAndSave(id);
  }

  // save shift
  saveShift(id, date) {
    let updatedData = [];
    
    updatedData[0] = id;
    updatedData[1] = date; 
    
    $(".drop-down-morning-shift").each(function(index) {
      if($(this).is(":visible")) {
        updatedData[2] = $(this).val();
      }
    });

    $(".drop-down-day-shift").each(function(index) {
      if($(this).is(":visible")) {
        updatedData[3] = $(this).val();
      }
    });

    $(".drop-down-night-shift").each(function(index) {
      if($(this).is(":visible")) {
        updatedData[4] = $(this).val();
      }
    });

    this.updateLocalData(updatedData);
    this.toggleUpdateAndSave(id);
  }
  
  // toggle update and save
  toggleUpdateAndSave(id) {
    for (let objs of this.allProductionSchedule) {
      if(objs["id"] == id) {
        objs["update"] = !objs["update"];
        objs["save"] = !objs["save"];
      } else {
        objs["update"] = true;
        objs["save"] = false;
      }
    }
  }

  // update local data
  updateLocalData(updatedData) {
    this.commonFunctions.sratrSpinner();

    // updating local JSON 
    for (let objs of this.allProductionSchedule) {
      if(objs["id"] == updatedData[0]) {
        objs["morningShiftDetails"]["shiftType"]["name"] = updatedData[2];
        objs["dayShiftDetails"]["shiftType"]["name"] = updatedData[3];
        objs["nightShiftDetails"]["shiftType"]["name"] = updatedData[4];
      }
    }
    
    var date = this.commonFunctions.milSecondToDate(updatedData[1]); 

    // call update service 
    this.allProductionDataService.postSchedule(date, updatedData[2], updatedData[3], updatedData[4]).toPromise().then(res => { 
        // Success
        console.log("Success");
        this.commonFunctions.stopSpinner();
        this.commonFunctions.showSuccess("Success","Update Schedule");
      }, msg => { 
        // Error
        console.log("Error : " + JSON.stringify(msg));
        this.commonFunctions.stopSpinner();
        this.commonFunctions.showError("Error","Update Schedule");
      }
    );

  }
  
  // creat Column Chart function 
  creatColumnChart(dataArrayColumn) {
    let chart = new CanvasJS.Chart("chartColumnContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Shift Details"
      },
      data: [{
        type: "column",
        dataPoints: dataArrayColumn
      }]
    });
      
    chart.render();
  }
  
  // create pai chart
  createPiChart(dataArrayPai) {
    let chart = new CanvasJS.Chart("chartPiContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Shift Details"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: dataArrayPai 
      }]
    });
      
    chart.render();
  }
  
  // Multi Page PDF function
  multiPagePDF() {
    console.log("multiPagePDF .... ");
    this.commonFunctions.sratrSpinner();
    let data = document.getElementById('PDFContent');  
    html2canvas(data).then(canvas => {
      //-------------------------------------
      var imgData = canvas.toDataURL('image/png');
      var imgWidth = 210; 
      var pageHeight = 295;  
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jspdf('p', 'mm', 'a4');
      var position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      this.commonFunctions.stopSpinner();
      doc.save( 'file.pdf');
      //-------------------------------------   
    });
  }

  // prev month
  prevMonth() {
    if(this.currentMonth == 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }

    this.ngOnInit();
  }

  // next month
  nextMonth() {
    if(this.currentMonth == 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }

    this.ngOnInit();
  }

  // search by date
  searchByDate() {
    this.commonFunctions.sratrSpinner();
    console.log("searchByDate.... "); 
    
    var startDate = $("#mat-input-0").val().toString();
    var endDate = $("#mat-input-1").val().toString();

    var d1 = new Date(startDate);
    var d2 = new Date(endDate);
    
    /*if(d1.getTime() === d2.getTime()) {
      alert("Please select different date.");
      return false;
    }*/ 

    if(d1.getTime() > d2.getTime()) {
      alert("Please select correct date.");
      return false;
    }

    var startDateArr = startDate.split("/");
    if(startDateArr[0].length == 1) {
      startDateArr[0] = 0+startDateArr[0];
    }
    if(startDateArr[1].length == 1) {
      startDateArr[1] = 0+startDateArr[1];
    }
    startDate = startDateArr[2]+"-"+startDateArr[0]+"-"+startDateArr[1];

    var endDateArr = endDate.split("/");
    if(endDateArr[0].length == 1) {
      endDateArr[0] = 0+endDateArr[0];
    }
    if(endDateArr[1].length == 1) {
      endDateArr[1] = 0+endDateArr[1];
    }
    endDate = endDateArr[2]+"-"+endDateArr[0]+"-"+endDateArr[1];

    this.allProductionDataService.getScheduleByDate(startDate, endDate).subscribe(response => {
      this.allProductionSchedule = this.dataRestructureing(response);
      
      this.dataLabel = "Shift calendar from "+startDate+" to "+endDate;
    });

    // create graph Betwen Month
    this.createBetwenMonthGraph(startDate, endDate);
    this.commonFunctions.stopSpinner();
  }
  
  // calculate and render graph
  calculateAndRenderGraph(data) {
    var dataArrayColumn = [];
    var dataArrayPai = [];

    for (let objs of data) {
      // column section
      let objColumn = { y: objs["shiftCount"], label: objs["shiftType"] };
      dataArrayColumn.push(objColumn);

      // pai section
      let objPai = { y: objs["shiftCount"], name: objs["shiftType"] };;
      dataArrayPai.push(objPai);
    }
    
    this.creatColumnChart(dataArrayColumn);
    this.createPiChart(dataArrayPai);
  }

  // create current month graph
  createCurrentMonthGraph() {
    this.allProductionDataService.getCurrentMonthGraphData(this.currentYear, this.currentMonth+1).subscribe(response => {
      this.calculateAndRenderGraph(response);
    });
  }

  // create betwen month graph
  createBetwenMonthGraph(startDate, endDate) {
    this.allProductionDataService.getBetwenMonthGraphData(startDate, endDate).subscribe(response => {
      this.calculateAndRenderGraph(response);
    });
  }

}