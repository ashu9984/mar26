import {
    Injectable
  } from '@angular/core';
  
  import {
    HttpClient,
    HttpHeaders
  } from '@angular/common/http';
  
  @Injectable()
  export class FormsService {
    constructor(private http: HttpClient) {}
  
    postForm(url, form) {
      return this.http.post('/profile/', form, {
        headers: new HttpHeaders().set('Content-Type', 'multipart/form-data'),
      })
    }
  }