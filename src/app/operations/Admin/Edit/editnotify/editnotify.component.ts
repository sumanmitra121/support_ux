import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editnotify',
  templateUrl: './editnotify.component.html',
  styleUrls: ['./editnotify.component.css',
  '../../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../../assets/masters_css_js/css/apps.css',
  '../../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../../assets/masters_css_js/css/res.css']
})
export class EditnotifyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('Active', '1');
    localStorage.setItem('address','/Admin/Edit/editnotify');
  }

}
