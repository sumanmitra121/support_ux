import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';






export interface PeriodicElement {
  SL: number;
  subject: string;
  

}

const ELEMENT_DATA: PeriodicElement[] = [
  {SL: 1, subject: 'Lorem Ispum'},
  {SL: 2, subject: 'Lorem Ispum'},
  {SL: 3, subject: 'Lorem Ispum'},
  {SL: 4, subject: 'Lorem Ispum'},
  {SL: 5, subject: 'Lorem Ispum'},
  {SL: 6, subject: 'Lorem Ispum'},
  {SL: 7, subject: 'Lorem Ispum'},
  {SL: 8, subject: 'Lorem Ispum'},
  {SL: 9, subject: 'Lorem Ispum'},
  {SL: 10, subject: 'Lorem Ispum'},
];


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class NotificationsComponent implements OnInit {

  displayedColumns: string[] = ['SL.No.', 'subject', 'Edit','Delete'];
  dataSource=new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router:Router) { }

  ngOnInit(): void {
    localStorage.setItem('Active', '1');
    localStorage.setItem('address','/operations/Admin/notifications')
    this.dataSource=new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  add_notification(){
    this.router.navigate(['/Admin/Addnotification/addnotify']);
  }
  got_to_edit(){
    this.router.navigate(['/Admin/Edit/editnotify']);
  }
}
