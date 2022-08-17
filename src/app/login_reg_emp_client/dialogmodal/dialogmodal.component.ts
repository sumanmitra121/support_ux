import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogmodal',
  templateUrl: './dialogmodal.component.html',
  styleUrls: ['./dialogmodal.component.css']
})
export class DialogmodalComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }
  closemodal(){
     this.dialog.closeAll();
  }


}
