import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private httpClient:HttpClient) { }

  getData(endPt:string) {
    return this.httpClient.get("http://api.zippopotam.us/us/"+endPt);
  }

  sendData(data:string) {
    return this.httpClient.post("",{data:data});
  }


}
