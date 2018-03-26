import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { NgModule } from '@angular/core';
import {Router} from '@angular/router'



@Component({
    templateUrl: './product.component.html',
    selector: 'app-product',
    styleUrls: ['../form.css']

})
export class ProductComponent {

    header;
    product = {

       proname:'',
       protype:'',
     proimage:''
      
    }
    constructor(private http: Http,private router:Router) {
        
        
        this.header = new Headers;
    }
    register() {
        
            this.http.post('/product/add', { proname:this.product.proname,protype:this.product.protype,proimage:this.product.proimage}, { headers: this.header }).subscribe(data => {
                let response = data.json()
                console.log(response);
                alert(response.msg)
                if(response.success==true){
                    this.router.navigate(["/productdisplay"]);
                     
                  }
                  else{}
                
             err => {
                let error = err.json();
                console.log("Error: ", error)
            } })
        }
       
    
   
}




