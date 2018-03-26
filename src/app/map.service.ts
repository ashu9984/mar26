import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import'rxjs/add/operator/map'
@Injectable()
export class MapService {

  constructor(private http:Http) { 

  }
  
  get(){
   return this.http.get("/geta").map(result=>result.json());

  }
  getproduct(){
    return this.http.get("/product/getdata").map(result=>result.json());
 
   }

  
    
   deleteUser(_id) {
    return this.http.delete('/product/delete/'+_id);
}
}

