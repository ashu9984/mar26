import { Component, ElementRef } from '@angular/core';
import { FileUploaderService } from '../file-uploader-service';


@Component({
  selector: 'my-own',
  templateUrl:'./profile.component.html',
  styles:[`
  .spinner{
    visibility:hidden;
    position:absolute;
    margin-left:50%;
    margin-top:50%
  }
  `],
  providers: [FileUploaderService]
})
export class ProfileComponent {
public title: string = 'Angular uploading Image files demo';
//public imgUploaded: string;
public tableData: any;
constructor(private fileUploader: FileUploaderService,
private elem: ElementRef
){

}

  public uploadImage(): void {
  this.elem.nativeElement.querySelector('#spinner').style.visibility='visible';
  let files = this.elem.nativeElement.querySelector('#selectFile').files;
  let formData = new FormData();
  let file = files[0];
  formData.append('photo', file);
  var response = this.fileUploader.uploadImage(formData).subscribe(res=> this.dataLoaded(res.json()));
  
  alert("Image Upload Result" + response)
}

private dataLoaded(data: any): void {
  this.elem.nativeElement.querySelector('#spinner').style.visibility='hidden';
   //this.imgUploaded = data._body;
  
}

private refreshList(): void {
  this.fileUploader.getFilesList().subscribe(res=> this.displayTableData(res));
  
}

private displayTableData(data: any): void {
this.tableData = data.json();
}


}
