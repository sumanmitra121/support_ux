import { Component, OnDestroy, OnInit,  ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'
import {Apollo, gql} from 'apollo-angular';
import { Subscription } from 'rxjs';
const DEL_MAS = gql`
mutation deleteMaster($id: String!){
  deleteMaster(id: $id, db_type: 2){
    success
    message
  }
}
`;
const SHOW_OP=gql`
query{
  getOprnModeData(id:"", db_type: 2){
    oprn_id
    oprn_mode
  }
}`

// export interface PeriodicElement {
//   Sl_No: any;
//   Operational_Mode: any;
//   Edit:any;
  
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     Sl_No: 1,
//     Operational_Mode: 'abc',
//     Edit:''
   
//   }, 
  
// ];
@Component({
  selector: 'app-omdashboard',
  templateUrl: './omdashboard.component.html',
  styleUrls: ['./omdashboard.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css'

]
})

export class OmdashboardComponent implements OnInit,OnDestroy{
  displayedColumns: string[] = ['Sl_No', 'Operational_Mode','Edit','Delete'];
  dataSource = new MatTableDataSource;
  private querySubscription: Subscription = new Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loading: boolean=false;
  posts_om: any=[];
  oprnid:any;
  dlt=true;
  x:any;
  updt=true;
  insrt=true;
  updateom:any;
  insertom:any;
  userdel:any;
  constructor(private router:Router,private apollo:Apollo) { }

  ngOnInit(): void {
    localStorage.setItem('Active', '1');
    localStorage.setItem('address','/operationmode/dashboard'); 

    this.updateom=localStorage.getItem('updateom')
    this.insertom=localStorage.getItem('addom')
    if(this.updateom=='0')
    {
       this.updt=true;
    }
    else
       {
         this.updt=false;
         localStorage.setItem('updateom','0')

       }
       if(this.insertom=='0')
       {
          this.insrt=true;
       }
       else
          {
            this.insrt=false;
            localStorage.setItem('addom','0')
   
          }

    this.posts_om.length=0;
    this.fetch_data();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  fetch_data(){
    this.querySubscription = this.apollo.watchQuery<any>({
      query: SHOW_OP,
      pollInterval:40000
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        console.log(data+" "+loading);
        this.posts_om = data;
       
        console.log(this.posts_om);
       this.putdata(this.posts_om);
      });

  }
  private putdata(posts:any){
    this.dataSource=new MatTableDataSource(posts.getOprnModeData);
    console.log(this.dataSource);
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
  go_to_AddItem(){
    this.router.navigate(['/operationmode/addom'])
  }
  go_to_update(v1:any,v2:any){
    //console.log(v1+" "+v2);
    this.router.navigate(['/operationmode/editom',v1,v2])
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
  showsnackbar() {
    // alert("error");
     this.x = document.getElementById("snackbar");
     this.x.className = "show";
     setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
   }
  delete(v:any){
    this.oprnid=v;
    
  }
  delete_item(){// alert(this.ctmid);
  
    this.apollo.mutate({
      mutation:DEL_MAS,
      variables:{
        id:this.oprnid,
        // name:v2,
        // user_id:localStorage.getItem("UserId")
        
      }
    }).subscribe(({data})=>{this.userdel=data;console.log(data);
      console.log("data:" +JSON.stringify(data))
      console.log(this.userdel.deleteMaster.message)
      if(this.userdel.deleteMaster.success==1)
      { // this.done=true;this.msg="Client Type updated successfully!!";
     // this.ctmdash.ngOnInit();
        // localStorage.setItem('updatectm','1')
        // this.router.navigate(['/clienttypemaster/dashboard'])
         this.dlt=false;
        }
        else
        this.showsnackbar();
    },error=>{ this.showsnackbar()
    });}
}
