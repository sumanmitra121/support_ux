import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addnotify',
  templateUrl: './addnotify.component.html',
  styleUrls: ['./addnotify.component.css',
  '../../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../../assets/masters_css_js/css/apps.css',
  '../../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../../assets/masters_css_js/css/res.css']
})
export class AddnotifyComponent implements OnInit {
  Addnotificationform!:FormGroup;
  submit:boolean=false;
  constructor(private fb:FormBuilder) { }
 
  ngOnInit(): void {
    localStorage.setItem('Active', '1');
    this.Addnotificationform= this.fb.group({
      date_value:['',[Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      subject:['',Validators.required],
      message:['',Validators.required]

    });
 
    localStorage.setItem('address','/Admin/Addnotification/addnotify');
  }
  get f(){
       return this.Addnotificationform.controls;
  }
  Add_notification(){
    this.submit=true;
      if(this.Addnotificationform.invalid)
      {
        return;
      }
      else{
        console.log("success");
      }
  }

}
