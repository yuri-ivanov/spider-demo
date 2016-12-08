import 'rxjs/add/operator/toPromise';
import { Component, Injectable } from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions}    from '@angular/http';

import {CarModel, Brand} from './carmodel';

@Injectable()
export class SpiderService{
  vwUpdatePirceUrl: string = "batch/countries/NOR/stepName/MSPA.ExportVWCarConfigurations";
  skodaUpdatePirceUrl: string = "batch/countries/NOR/stepName/MSPA.ExportSkodaCarConfigurations";
  audiUpdatePirceUrl: string = "batch/countries/NOR/stepName/MSPA.ExportAudiCarConfigurations";

  constructor(private http: Http){
  }

  findModels(brand: Brand, search): Promise<CarModel[]>{
    /*let cars: CarModel[]=[];
    for(let i=0; i<10; i++){
      cars[i]= {modelNumber:"553123"+i, typeNumber: "typeNumber"+i, text: "testmodll "+i, spiderPackages: "pk"+i};
    }*/
    //return Promise.resolve(cars);
    let params = new URLSearchParams();
    params.set("text", search);
    return this.http.get("api/"+brand+"/search", {search: params})
      .toPromise()
      .then(response => {
        let data  = response.json();
        console.log("find data", response, data);
        return response.json()
      });
      //as CarModel[]
  }

  updatePrices(brand: Brand): Promise<String> {
    let updateUrl = "";
    if(brand == Brand.VW){
      updateUrl = this.vwUpdatePirceUrl;
    } else if(brand == Brand.SKODA) {
      updateUrl = this.skodaUpdatePirceUrl;
    } else if(brand == Brand.AUDI)  {
      updateUrl = this.audiUpdatePirceUrl;
    }

    return this.http.get(updateUrl).toPromise()
      .then( response => {console.log(response); return response.text(); }  )
      .catch(this.handleError);
  }

  saveCarModels(brand: Brand, carmodels: CarModel[]){
    let postUrl = '/api/' + brand + '/carmodels';
    let jsonString = JSON.stringify(carmodels);
    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options       = new RequestOptions({ headers: headers });
    console.log(options);
    this.http.post(postUrl, jsonString, options).toPromise()
      .then(resp => console.log('response', resp))
      .catch((e:any) => { console.log('error', e); return e; });

    console.log("car model saved: ", postUrl, jsonString);
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }

}
