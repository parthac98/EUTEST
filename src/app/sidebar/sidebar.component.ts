import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    /*$('#sidebarCollapse').on('click', function () {
      console.log("toggle");
    	$('#sidebar').toggleClass('active');
    });*/
    this.activeSidebar();
    $('.panel-group').on('hidden.bs.collapse', this.toggleIcon);
    $('.panel-group').on('shown.bs.collapse', this.toggleIcon);
  }

  toggleIcon(e) {
    $(e.target)
      .prev('.panel-heading')
      .find(".more-less")
      .toggleClass('glyphicon-plus glyphicon-minus');
  }

  activeSidebar() {
    $('#sidebarCollapse').on('click', function () {
      console.log("toggle");
    	$('#sidebar').toggleClass('active');
    });
  }
  
}