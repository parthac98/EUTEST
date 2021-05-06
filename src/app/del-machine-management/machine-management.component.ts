import { Component, OnInit } from '@angular/core';

import { LoginAndToken } from "../services/loginAndToken.service";

@Component({
  selector: 'app-machine-management',
  templateUrl: './machine-management.component.html',
  styleUrls: ['./machine-management.component.css']
})
export class MachineManagementComponent implements OnInit {

  constructor(private loginAndToken: LoginAndToken) { }

  ngOnInit(): void {
    if(!this.loginAndToken.isAuthTokenValid()) {
      this.loginAndToken.logOut();
    }
  }

}
