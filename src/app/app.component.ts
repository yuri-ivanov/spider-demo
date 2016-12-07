import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import {SpiderService} from './spider.service';
import {CarModel, Brand} from './carmodel';

@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  brandText: String;
  brand: Brand;
  search: String;
  carmodels: CarModel[];
  error: string;

  constructor(
    private spiderService: SpiderService,
    private route: ActivatedRoute,
    private location: Location
  ){}

  ngOnInit() : void {
    console.log("path param", this.route.params);

    this.route.params.subscribe(params => {
          this.brandText = params['carbrand'];
          this.brand = Brand[Brand[params['carbrand'].toUpperCase()]];
          console.log("path param", this.brandText, this.brand);
          this.onSearch(null);
        });
  }

  onSearch(e){
    if(e) { e.preventDefault(); }
      this.spiderService.findModels(this.brand, this.search).then(res => {
        console.log(res);
        this.carmodels = res;
    }).catch(exception => {
      this.error = exception;
      console.log(exception);
    });
  }

  onSave(){
    this.spiderService.saveCarModels(this.carmodels);
  }
}
