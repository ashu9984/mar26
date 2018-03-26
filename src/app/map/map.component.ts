import { Component,  } from '@angular/core';
import{MapService} from'../map.service'

import{Http,Headers} from '@angular/http'
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']

})
export class MapComponent  {
 result:any; 
  name:string;
 
 

  constructor (public http:Http,private MyService:MapService) { 
    this.name="Angular Srevice";
    this.MyService.get().subscribe(x=>(this.result=x))
  }

  ngOnInit() {
  }



}
