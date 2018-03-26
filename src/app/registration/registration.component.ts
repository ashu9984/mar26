import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import{Router} from '@angular/router'
import { NgModule } from '@angular/core';


@Component({
    templateUrl: './registration.component.html',
    selector: 'app-registration',
    styleUrls: ['../form.css']

})
export class RegistrationComponent {

    
    header;
    user = {

       fname:'',
       lname:'',
        mno:'',
        email: '',
        password: '',
        cpass:''
    }
    constructor(private http: Http,private router:Router) {
        
        
        this.header = new Headers;
    }
    register() {
        if (this.user.password != this.user.cpass)
        {
            alert("Passwords do not match")
           
        }
        else
        {
            this.http.post('/registration', { fname:this.user.fname,lname:this.user.lname,mno:this.user.mno,email:this.user.email, password:this.user.password,cpass:this.user.cpass}, { headers: this.header }).subscribe(data => {
                let response = data.json()
                console.log(response);
                alert(response.msg)
                if(response.success==true){
                    this.router.navigate(["/login"]);
                       
                    }
                    else{
                        this.router.navigate(["/registration"]);
                    }
                        
                 }
                
            , err => {
                let error = err.json();
                console.log("Error: ", error)
            })  
        }
       
    }
}




