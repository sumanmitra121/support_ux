import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'
import {Apollo, gql} from 'apollo-angular';
import { Subscription } from 'rxjs';
const DEL_MAS = gql`
mutation deleteMaster($id: String!){
  deleteMaster(id: $id, db_type: 3){
    success
    message
  }
}
`;
const SHOW_TS=gql`
query{
  getTktStatusData(id:"", db_type: 3){
    tkt_id
    tkt_status
  }
}`

// export interface PeriodicElement {
//   Sl_No: any;
//   Status: any;
//   Edit:any;
  
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     Sl_No: 1,
//     Status: 'abc',
//     Edit:''
   
//   }, 
  
// ];
@Component({
  selector: 'app-tsdashboard',
  templateUrl: './tsdashboard.component.html',
  styleUrls: ['./tsdashboard.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css'

]
})
export class TsdashboardComponent implements OnInit,OnDestroy {
  displayedColumns: string[] = ['Sl_No', 'Status','Edit','Delete'];
  dataSource = new MatTableDataSource; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  updt=true;
  insrt=true;
  dlt=true;
  updatets:any;
  insertts:any;
  loading: boolean=false;
  posts_ts: any=[];
  private querySubscription: Subscription = new Subscription;
  constructor(private router:Router,private apollo:Apollo) { }
  tsid:any;
 x:any;
 userdel:any;
  ngOnInit(): void {
    localStorage.setItem('Active', '1');
    localStorage.setItem('address','/ticketstatus/dashboard');  

    this.updatets=localStorage.getItem('updatets')
    this.insertts=localStorage.getItem('addts')
    if(this.updatets=='0')
    {
       this.updt=true;
    }
    else
       {
         this.updt=false;
         localStorage.setItem('updatets','0')

       }
       if(this.insertts=='0')
       {
          this.insrt=true;
       }
       else
          {
            this.insrt=false;
            localStorage.setItem('addts','0')
   
          }

    this.posts_ts.length=0;
    this.fetch_data();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  fetch_data(){
    this.querySubscription = this.apollo.watchQuery<any>({
      query: SHOW_TS,
      pollInterval:40000
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.posts_ts = data;
       
        console.log(this.posts_ts);
       this.putdata(this.posts_ts);
      });

  }
  private putdata(posts:any){
    this.dataSource=new MatTableDataSource(posts.getTktStatusData);
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
    this.router.navigate(['/ticketstatus/addts'])
  }
  go_to_update(v1:any,v2:any){
    this.router.navigate(['/ticketstatus/editts',v1,v2])
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
  delete(v:any){this.tsid=v;}
  delete_item(){this.apollo.mutate({
    mutation:DEL_MAS,
    variables:{
      id:this.tsid,
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
