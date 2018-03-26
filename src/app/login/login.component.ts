import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Router} from '@angular/router'


@Component({
    templateUrl: './login.component.html',
    selector: 'app-login',
    styleUrls:['../form.css']
})
export class LoginComponent  {
    header;
   
    user={
        email:'',
        password:"",
        otp:""
        
    }

    

    constructor(private http: Http,private router:Router) {
        this.header = new Headers;
    }
    ngOnInit(){
    }
    login() {
        this.http.post('/login', {email:this.user.email, password:this.user.password,otp:this.user.otp}, { headers: this.header }).subscribe(data => {
            let response = data.json();
            console.log(response);
            alert(response.msg);
            if (response.success==true) {    
                this.router.navigate(["/product"]);
            }
            else{}
                
           
           
        }, err => {
            let error = err.json();
            console.log("Error: ", error)
        })
    }
    getAllUser() {
        this.http.get('/getAll').subscribe(data => {
          let response = data.json()
          
         console.log(response);
         console.log(response.data)
        
        
        })}
   
}

