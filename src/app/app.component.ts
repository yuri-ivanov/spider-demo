import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import {SpiderService} from './spider.service';
import {CarModel} from './carmodel';

@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  brand: String;
  search: String;
  carmodels: CarModel[];

  constructor(
    private spiderService: SpiderService,
    private route: ActivatedRoute,
    private location: Location
  ){}

  ngOnInit() : void {
    console.log("path param", this.route.params);
    console.log("path param", this.route.params['carbrand']);

    this.route.params.subscribe(params => {
          this.brand = params['carbrand'];
          this.onSearch(null);
        });
  }

  onSearch(e){
    if(e) { e.preventDefault(); }
    this.spiderService.findModels(this.search).then(serverCarModels => {
      this.carmodels = serverCarModels;
    });
  }

  onSave(){
    this.spiderService.saveCarModels(this.carmodels);
  }
}
