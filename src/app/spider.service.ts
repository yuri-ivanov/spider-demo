import 'rxjs/add/operator/toPromise';
import { Component, Injectable } from '@angular/core';
import { HttpModule, Http }    from '@angular/http';

import {CarModel, Brand} from './carmodel';

@Injectable()
export class SpiderService{
  vwUpdatePirceUrl: string = "testurl";
  skodaUpdatePirceUrl: string = "testurl2";
  audiUpdatePirceUrl: string = "testurl3";

  constructor(private http: Http){
  }

  findModels(search): Promise<CarModel[]>{
    let cars: CarModel[]=[];
    for(let i=0; i<10; i++){
      cars[i]= {mmod:"553123"+i, type: "type"+i, text: "testmodll "+i, spiderPackages: "pk"+i};
    }
    //return this.http.get(this.vwUpdatePirceUrl).toPromise().then(response => response.json().data as CarModel[]);
    return Promise.resolve(cars);
  }

  updatePrices(brand: Brand): Promise<String> {
    if(brand == Brand.VW){
      console.log("update vw");
    } else {
      console.log("update not vw");
    }

    return this.http.get(this.vwUpdatePirceUrl).toPromise()
      .then( response => response.toString() )
      .catch(this.handleError);
  }

  saveCarModels(carmodels: CarModel[]){
    console.log("car model saved: ", carmodels);
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }

}
