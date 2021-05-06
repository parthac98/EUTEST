import { Component, OnInit } from '@angular/core';

import { CommonFunctions } from "../services/commonFunctions.service";
import { LoginAndToken } from "../services/loginAndToken.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  constructor() {}

  ngOnInit(): void {
    
  }

}
