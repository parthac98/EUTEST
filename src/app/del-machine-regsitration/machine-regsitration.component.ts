import { Component, OnInit } from '@angular/core';

import { GetMachineData } from '../services/getMachineData.service';
import { CommonFunctions } from '../services/commonFunctions.service';
import { LoginAndToken } from "../services/loginAndToken.service";

@Component({
  selector: 'app-machine-regsitration',
  templateUrl: './machine-regsitration.component.html',
  styleUrls: ['./machine-regsitration.component.css']
})
export class MachineRegsitrationComponent implements OnInit {
  // process type
  processTypeArr: any;
  
  // machine type
  machineDataArr: any;
  
  // machine make 
  machineMakeArr: any;
  
  // machine attribute attr
  machineAttrArr: any;

  // single select arr
  singleSelectArr: any;

  // multy select arr
  multySelectArr: any;

  // constructor
  constructor(private machineDataService:GetMachineData, 
              private commonFunctions:CommonFunctions,
              private loginAndToken: LoginAndToken) { }

  ngOnInit(): void {
    if(!this.loginAndToken.isAuthTokenValid()) {
      this.loginAndToken.logOut();
    } else {
      this.commonFunctions.sratrSpinner();
      this.machineDataService.getProcessType().subscribe(response => {
        this.processTypeArr = response;
        //console.log("data : " + JSON.stringify(this.processTypeArr));
        this.commonFunctions.stopSpinner();
      });
    }  
  }
  
  // get Machine Data
  getMachineData() {
    var processID = $("#processTypeID").val();
    this.commonFunctions.sratrSpinner();
    this.machineDataService.getMachineType(processID).subscribe(response => {
      this.machineDataArr = response;
      //console.log("machine data : " + JSON.stringify(this.machineDataArr));
      this.commonFunctions.stopSpinner();
    });
  }

  // get machine make 
  getMachineMake() {
    var machineTypeID = $("#machineTypeID").val();
    //this.commonFunctions.sratrSpinner();
    this.machineDataService.getMachineMake(machineTypeID).subscribe(response => {
      this.machineMakeArr = response;
      //console.log("machine make data : " + JSON.stringify(this.machineMakeArr));
      this.getMachineAttribute();
    });
  }
  
  // get machine attribute
  getMachineAttribute() {
    var machineTypeID = $("#machineTypeID").val();
    this.commonFunctions.sratrSpinner();
    this.machineDataService.getMachineAttributeData(machineTypeID).subscribe(response => {
    this.machineAttrArr = response;
      
      //console.log("machine attr 1 : " + JSON.stringify(response[0]["attribute"]));
      //console.log("machine attr 2 : " + JSON.stringify(this.machineAttrArr));

      // creating single and multy select arr
      for (let objs of this.machineAttrArr) {
        if(objs["attribute"]["attributeType"] == 2) {
          //console.log("SS " + JSON.stringify(objs["attribute"]["attributeDomainValues"]));
          this.singleSelectArr = objs["attribute"]["attributeDomainValues"].split(",");
        } else if(objs["attribute"]["attributeType"] == 3) {
          //console.log("MS " + JSON.stringify(objs["attribute"]["attributeDomainValues"]));
          this.multySelectArr = objs["attribute"]["attributeDomainValues"].split(",");
        }
      }
      this.commonFunctions.stopSpinner();
    });
  }

  // save machine 
  saveMachine() {
    //console.log("saveMachine");
    console.log("val : " + $("#machine-purchase-date").val());

    if($("#processTypeID").val() == "") {
      alert("Please select a process type.\n\nPlease select or provide value to all mandetory fields with red star to save the machine details");
      return false;
    }
    
    if($("#machineTypeID").val() == "") {
      alert("Please select a machine type.\n\nPlease select or provide value to all mandetory fields with red star to save the machine details");
      return false;
    }

    if($("#machine-purchase-date").val() == "") {
      alert("Please select a purchase date.\n\nPlease select or provide value to all mandetory fields with red star to save the machine details");
      return false;
    } /*else {
      let nowDate = new Date();
      let userDate = $("#machine-purchase-date").val();
      let beforeDate = Date.parse(userDate);
      if(beforeDate < nowDate) {
        console.log("1");
      } else {
        console.log("2"); 
      }
    }*/

    if($("#machineMake").val() == "") {
      alert("Please select a machine make.\n\nPlease select or provide value to all mandetory fields with red star to save the machine details");
      return false;
    }

    this.commonFunctions.sratrSpinner();
    var processTypeID = $("#processTypeID").val();
    var processType = $("#processTypeID option:selected").text();
    var machineTypeID = $("#machineTypeID").val();
    var machineType = $("#machineTypeID option:selected").text();
    var dateOfPurchase = $("#machine-purchase-date").val();
    dateOfPurchase = this.commonFunctions.dateToMilSecond(dateOfPurchase);
    console.log("date : " + dateOfPurchase + " / " + $("#machine-purchase-date").val());
    var machineMakeID = $("#machineMake").val();
    var machineMake = $("#machineMake option:selected").text();
    var machineDesc = $("#machineDesc").val();

    var attributeId = 1; 
    var attributeName: any;
    var attributeValue: any;
    let machineAttributes = [];

    $(".machineAttribute").each(function( index ) {
      if($(this).attr("attrtype") == "textbox") {
        attributeName = $(this).parent().parent().find("label").text();
        attributeValue = $(this).val();
      } else if($(this).attr("attrtype") == "seingleSelect") {
        attributeName = $(this).parent().parent().find("label").text()
        attributeValue = $(this).val();
      } else if($(this).attr("attrtype") == "multiSelect") {
        attributeName = $(this).parent().find("label").text();
        attributeValue = $(this).children().text();
      }
      var localObj = {
        "attributeId": attributeId,
        "attributeName": attributeName,
        "attributeValue": attributeValue
      }
      machineAttributes.push(localObj);
      attributeId++;
    });

    let machineAttrObj = {
      "machineAttributes": machineAttributes
    };
    
    /*let machineAttrObj = {
      "machineAttributes": [
        {
          "attributeId": 1,
          "attributeName": "No of Delivery Units",
          "attributeValue": "10"
        }
      ]
    };*/

    //console.log("post Obj " + JSON.stringify(machineAttrObj));
    return false;

    this.machineDataService.postMachine(processTypeID,processType,machineTypeID,machineType,machineAttrObj,dateOfPurchase,machineMakeID,machineMake,machineDesc).toPromise().then(res => { 
        // Success
        console.log("Success : " + res);
      }, msg => { 
        // Error
        console.log("Error : " + msg);
        
        var returnValue = this.commonFunctions.checkSuccess(msg);
        var returnValueArr = returnValue.split("/");
        var returnStatus = returnValueArr[0];
        
        if(returnStatus == "401") {
          //console.log("in error");
          this.commonFunctions.stopSpinner();
          this.commonFunctions.showError("Error : "+returnStatus+"","Register Machine");
        }
        
        if(returnStatus == "500") {
          //console.log("in error");
          this.commonFunctions.stopSpinner();
          this.commonFunctions.showError("Error : Please refresh the page and try again after some time","Register Machine");
        }

        if(returnStatus == "201") {
          //console.log("in success");
          this.commonFunctions.stopSpinner();
          this.commonFunctions.showSuccess("Success","Machine Registration");
          var message = returnValueArr[2];
          this.findSuccessFunction(message);
        }

      }
    );

  }

  // find success function
  findSuccessFunction(message) {
    $("#processTypeID").attr("disabled", "disabled");
    $("#machineTypeID").attr("disabled", "disabled");
    $("#attrTextBox").attr("disabled", "disabled");
    $("#singleSelect").attr("disabled", "disabled");
    $(".mat-select-value-text").attr("disabled", "disabled");
    $("#mat-input-0").attr("disabled", "disabled");
    $("#machineMake").attr("disabled", "disabled");
    $("#machineDesc").attr("disabled", "disabled");
    $("#save").attr("disabled", "disabled");
    $("#canc").attr("disabled", "disabled");
    $("#machineTitle").text("");
    $("#machineTitle").text(message);
  }

}
