import { Component, Injectable } from '@angular/core';
import {CarModel} from './carmodel';

@Injectable()
export class SpiderService{

  findModels(search){
    let cars: CarModel[]=[];
    for(let i=0; i<10; i++){
      cars[i]= {mmod:"CarModel123"+i, type: "type"+i, text: "testmodll "+i, spiderPackages: "pk"+i};
    }
    return cars;
  }

  saveCarModels(carmodels: CarModel[]){
    console.log("car model saved: ", carmodels);
  }

}
