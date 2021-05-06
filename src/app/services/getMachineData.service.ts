import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginAndToken } from './loginAndToken.service';
import { EnvService } from '../services/env.service';

@Injectable({
  providedIn: 'root'
})
export class GetMachineData {

  // constructor
  constructor(private httpClient: HttpClient,
              private loginAndToken: LoginAndToken,
              private env: EnvService) { }

  private APIURL = this.env.apiUrl;

  private AUTHTOKEN = this.loginAndToken.getAuthToken();

  private getProcessURL = this.APIURL + '/EUTEST-service/getAllProcess';
  private getMachineTypeURL = this.APIURL + '/EUTEST-service/getMachineTypesByProcessId/';
  private getMachineMakeURL = this.APIURL + '/EUTEST-service/getMachineMakesByMachineType/';
  private getMachineAttrURL = this.APIURL + '/EUTEST-service/getMachineTypeAttributeEntity/';
  
  private getAllMachineDataURL = this.APIURL + '/EUTEST-service/getAllMachines';
  private getSingleMachineDataURL = this.APIURL + '/EUTEST-service/getMachineDetails/';
  
  private gettMachineInspectionDataURL = this.APIURL + '/EUTEST-service/getLastInspectionDetails?machineIdentifier=';
  
  private postMachineURL = this.APIURL + "/EUTEST-service/registerMachine";
  private postMachineInspectionURL = this.APIURL + "/EUTEST-service/saveMachineInspectionDetails";
  
  private deleteMachineURL = this.APIURL + "/EUTEST-service/deleteMachine/";

  machineIdentifireString: string; 

  private httpOptions = {
    headers: new HttpHeaders({  
      'Content-Type': 'application/json',
      'TOKEN': this.AUTHTOKEN
    })
  }; 
   
  getProcessType() {
    return this.httpClient.get(this.getProcessURL);
  }

  getMachineType(processID) {
    return this.httpClient.get(this.getMachineTypeURL+processID);
  }
  
  getMachineMake(machineTypeID) {
    return this.httpClient.get(this.getMachineMakeURL+machineTypeID);
  }

  getMachineAttributeData(machineTypeID) {
    return this.httpClient.get(this.getMachineAttrURL+machineTypeID);
  }

  getAllMachineData() {
    console.log("Token : " + this.AUTHTOKEN);
    
    return this.httpClient.get(this.getAllMachineDataURL);
  }

  getSingleMachineData(machineID) {
    return this.httpClient.get(this.getSingleMachineDataURL+machineID);
  }

  gettMachineInspectionData(machineIdentifireString) {
    var machineInspectionDetailURL = this.gettMachineInspectionDataURL + machineIdentifireString;
    return this.httpClient.get(machineInspectionDetailURL);
  }
  
  createJSONpostData(processTypeID,processType,machineTypeID,machineType,machineAttrObj,dateOfPurchase,machineMakeID,machineMake,machineDesc) {
    var machineAttributes = machineAttrObj.machineAttributes;
    let thisDataObj = { 
      "description": machineDesc,
      "machineMakeId": Number(machineMakeID),
      "machineMakeName": machineMake,
      "machineTypeId": Number(machineTypeID),
      "machineTypeName": machineType,
      "processId": Number(processTypeID),
      "processName": processType,
      "purchaseDate": Number(dateOfPurchase),
      "machineAttributes": machineAttributes
    };
    
    //console.log("post Obj : " + JSON.stringify(thisDataObj));
  
    return thisDataObj;
  }

  postMachine(processTypeID,processType,machineTypeID,machineType,machineAttrObj,dateOfPurchase,machineMakeID,machineMake,machineDesc){
    let body = this.createJSONpostData(processTypeID,processType,machineTypeID,machineType,machineAttrObj,dateOfPurchase,machineMakeID,machineMake,machineDesc);
    
    console.log("post Obj : " + JSON.stringify(body));
    
    return this.httpClient.post(this.postMachineURL, body, this.httpOptions);
  }
  
  createJSONforInspectionData(deliveryUnitStatus,machineTypeId,inspectionDateTime,machineIdentifier) {
    let thisDataObj = {
      "machineTypeId": Number(machineTypeId),
      "inspectionDateTime": Number(inspectionDateTime),
      "machineIdentifier": machineIdentifier,
      "deliveryUnitStatus": deliveryUnitStatus,
    };

    return thisDataObj;
  }

  postMachineInspectionData(deliveryUnitStatus,machineTypeId,inspectionDateTime,machineIdentifier) {
    let body = this.createJSONforInspectionData(deliveryUnitStatus,machineTypeId,inspectionDateTime,machineIdentifier);
    return this.httpClient.post(this.postMachineInspectionURL, body, this.httpOptions);
  }
  
  // delete machine 
  deleteMachine(machineId) {
    return this.httpClient.delete(this.deleteMachineURL+machineId);
  }
  
  // store Machine Identifier ID
  storeMachineIdentifierID(machineIdentifier) {
    this.machineIdentifireString = machineIdentifier;
  }

  // get machine Identifire String
  getMachineIdentifireString() {
    return this.machineIdentifireString;
  }

}