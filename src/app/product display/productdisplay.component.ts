import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { MapService } from '../map.service'


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-productdisplay',
    templateUrl: './productdisplay.component.html',
    styleUrls: ['../form.css']


})
export class ProductDisplayComponent {
    result: any
    _id: string
    products;
    displayedContacts;
    showAll = true;
    constructor(private route: ActivatedRoute, private http: Http, private map: MapService) {

        this.call()




    }
    ngOnInit() {



    }
    API() {
        let url = "/product/getdata"
        return this.http.get(url).map(
            res => res.json()
        )
    }
    call() {

        this.API().subscribe(x => {
            this.result = x.products

        })
    }
    deleteUser(_id) {
        this.map.deleteUser(_id).subscribe(
            data => {
                let response = data.json();
                console.log(response);
                alert(response.msg);
               this.call() 
            },);


    }


}
