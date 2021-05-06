import { Injectable } from '@angular/core';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctions {
   
  constructor(private spinner: NgxSpinnerService, 
              private toastr: ToastrService) {}

  dateToMilSecond(dateOfPurchase) {
    //var st = dateOfPurchase;
    //var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    var d = new Date(dateOfPurchase);
    var newDate = d.getTime();

    return newDate;
  }

  todaysDateInMilSecond() {
    var today = new Date();
    var newDate = today.getTime();

    return newDate;
  }
  
  milSecondToDate(dateArg) {
    var d = new Date(dateArg).toLocaleDateString();
    var dateArr = d.split("/");
    var month = dateArr[0];
    var day = dateArr[1];
    var year = dateArr[2];

    if(month.length < 2) {
      month = "0"+month;
    }

    if(day.length < 2) {
      day = "0"+day;
    }

    var newDate = year+"-"+month+"-"+day;

    return newDate;
  }

  // start spinner
  sratrSpinner() {
    this.spinner.show();
  }

  // stop spinner
  stopSpinner() {
    this.spinner.hide();
  }
  
  // show success
  showSuccess(msg1, msg2) {
    this.toastr.success(msg1, msg2, {
      timeOut: 4000,
    });
  }

  // show error
  showError(msg1, msg2) {
    this.toastr.error(msg1, msg2, {
      timeOut: 4000,
    });
  }
  
  // check success
  checkSuccess(msg) {
    var status = "";
    var statusText = "";
    var message = "";
    for (var key in msg) {
      if (msg.hasOwnProperty(key)) {
        if(key ==  "status") {
          status = msg[key];
        }
        if(key ==  "statusText") {
          statusText = msg[key];
        }
        if(key == "error") {
          for (var keyIn in msg[key]) {
            if(keyIn == "text") { 
              message = msg[key][keyIn];
            }  
          }
        }  
      }
    }
    
    var returnValue = status + "/" + statusText + "/" + message;
    
    console.log("msg : " + JSON.stringify(msg));
    
    return returnValue;
  }

}