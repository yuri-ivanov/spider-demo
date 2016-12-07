import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Location }               from '@angular/common';

import { Brand }               from '../carmodel';
import { AppComponent }               from '../app.component';
import { SpiderService }               from '../spider.service';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  brandText: String;
  brand: Brand;
  priceUpdateStatus: String;
  errorStatus: boolean;
  requestRunning: boolean;

  constructor(
    private spiderService: SpiderService,
    private router: Router,
    private location: Location) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
          if(event instanceof NavigationEnd){
            this.brandText = event.url.substring(1).toUpperCase();
            this.brand = Brand[event.url.substring(1).toUpperCase()];
          }
        });
  }

  priceUpdate(){
    this.requestRunning = true;
    this.spiderService.updatePrices(this.brand)
    .then(statusString => {
      this.priceUpdateStatus = statusString;
      this.errorStatus = false;
      this.requestRunning = false;
    })
    .catch(error => {
      this.priceUpdateStatus = "ERROR - "+error;
      this.errorStatus = true;
      this.requestRunning = false;
    });
  }

}
