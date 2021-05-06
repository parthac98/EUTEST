import { Component, OnInit } from '@angular/core';

import { GetMachineData } from '../services/getMachineData.service';
import { CommonFunctions } from '../services/commonFunctions.service';
import { LoginAndToken } from "../services/loginAndToken.service";

@Component({
  selector: 'app-machine-quality-inspection',
  templateUrl: './machine-quality-inspection.component.html',
  styleUrls: ['./machine-quality-inspection.component.css']
})
export class MachineQualityInspectionComponent implements OnInit {
  // all machine Data
  machineInspectionDataArr: any;
  
  // every machine status array
  everyMachineStatusArr = [];

  constructor(private machineDataService:GetMachineData, 
              private commonFunctions:CommonFunctions,
              private loginAndToken: LoginAndToken) { }
  
  // Working = 1 (green) (class = no class)
  // Mechanical = 2 (cyan) (class = mec)
  // Slivery Shortage = 3 (yellow) (class = slsh)
  // Worker Issue = 4 (red) (class = woi)
  
  ngOnInit(): void {
    if(!this.loginAndToken.isAuthTokenValid()) {
      this.loginAndToken.logOut();
    } else {
      this.commonFunctions.sratrSpinner();
      var machineIdentifireString = this.machineDataService.getMachineIdentifireString();
      this.machineDataService.gettMachineInspectionData(machineIdentifireString).subscribe(response => {
        this.machineInspectionDataArr = response;
        //console.log("Machine inspection data : " + JSON.stringify(response));

        this.createEveryMachineStatus();
        this.commonFunctions.stopSpinner();
      });
    }  
  }
  
  createEveryMachineStatus() {
    var machineInspectionData = this.machineInspectionDataArr.deliveryUnitStatus;
    var machineInspectionDataArray = machineInspectionData.split(",");
    this.everyMachineStatusArr = [];
    
    for (let objs of machineInspectionDataArray) {
      var thisObj = objs;
      var thisArray = thisObj.split(":");
      
      let thisDataObj = { "machineNumber": thisArray[0], "machineStatus": thisArray[1] };
      this.everyMachineStatusArr.push(thisDataObj);
    }

    //console.log("Every machine status : " + JSON.stringify(this.everyMachineStatusArr));
    //console.log(typeof(this.everyMachineStatusArr));
  }
  
  // select machine
  selectMAchineStatus(className) {
    console.log('className : ' + className);

    $(".sel").each(function(index) {
      $(this).removeClass("sel").addClass(className);
    });
  }
  
  // select machine 
  selectMachine(machineID) {
    $(".singleMachine").each(function(index) {
      if(machineID == $(this).attr('id')) {
        var className = $(this).children().eq(1).attr('class');
        
        if(className == undefined) {
          $(this).children().eq(1).addClass("sel");
        } else if(className == 'sel') { 
          var oldClassName = $(this).children().eq(1).attr('oldClass'); 
          if(oldClassName == undefined) {
            $(this).children().eq(1).removeClass("sel");
          } else {
            $(this).children().eq(1).removeClass("sel").addClass(oldClassName);
          } 
        } else {
          $(this).children().eq(1).removeClass(className).addClass("sel");
          $(this).children().eq(1).attr('oldClass', className);
        }
      }
    });
  }

  // update machine status
  updateMachineStatus() {
    console.log("update machine status");
    
    this.commonFunctions.sratrSpinner();

    var eachMachineDataArr = [];
    var deliveryUnitStatus = "";

    $(".singleMachine").each(function(index) {
      var machineID = $(this).attr('id');
      var machineStatusNew = "";
      
      if($(this).children().eq(1).attr('class') == undefined) {
        machineStatusNew = "1";
      } else if($(this).children().eq(1).attr('class') == "mec") {
        machineStatusNew = "2";  
      } else if($(this).children().eq(1).attr('class') == "slsh") {
        machineStatusNew = "3";
      } else if($(this).children().eq(1).attr('class') == "woi") {
        machineStatusNew = "4";
      }

      var eachMachinData = machineID + ":" + machineStatusNew;
      eachMachineDataArr.push(eachMachinData);
    });

    var deliveryUnitStatus = eachMachineDataArr.join(",");
    var machineTypeId = $("#machineTypeIdTextBox").val();
    var inspectionDateTime = this.commonFunctions.todaysDateInMilSecond();
    var machineIdentifier = $("#machineIdentifierTextBox").val();
    //var noOfDeliveryUnit = 350;

    this.machineDataService.postMachineInspectionData(deliveryUnitStatus,machineTypeId,inspectionDateTime,machineIdentifier).toPromise().then(res => { 
        // Success
        console.log("Ok : " + res);
        this.commonFunctions.stopSpinner();
        this.commonFunctions.showError("Error", "Machine Inspection");
      }, msg => { 
        // Error
        console.log("not ok : " + JSON.stringify(msg));
        this.commonFunctions.stopSpinner();
        this.commonFunctions.showSuccess("Seccess", "Machine Inspection");
        this.ngOnInit();
      }
    );
  }

}
