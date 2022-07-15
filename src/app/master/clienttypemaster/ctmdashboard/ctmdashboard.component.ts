import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Router} from '@angular/router'
import {Apollo, gql} from 'apollo-angular';
const SHOW_CLIENT_TYPE=gql`
query{
  getClientTypeData(id:"", db_type: 1){
    client_id
    client_type
  }
}`
const DEL_MAS = gql`
mutation deleteMaster($id: String!){
  deleteMaster(id: $id, db_type: 1){
    success
    message
  }
}
`;
// export interface PeriodicElement {
//   Sl_No: any;
//   Client_Type: any;
//   Edit:any;
  
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     Sl_No: 1,
//     Client_Type: 'abc',
//     Edit:''
   
//   }, 
  
// ];

@Component({
  selector: 'app-ctmdashboard',
  templateUrl: './ctmdashboard.component.html',
  styleUrls: ['./ctmdashboard.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css'
]
})

export class CtmdashboardComponent implements OnInit, OnDestroy {

  userdata:any;
  userdel:any;
  updt=true;
  insrt=true;
  updatectm:any;
  insertctm:any;
  private querySubscription: Subscription = new Subscription;
  displayedColumns: string[] = ['Sl_No', 'Client_Type','Edit','Delete'];
  dataSource = new MatTableDataSource([]);
 dlt=true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loading: boolean=false;
  posts_ctm: any=[];
  ctmid:any;
  x:any;

  constructor(private router:Router,private apollo:Apollo) { }

  ngOnInit(): void {
    localStorage.setItem('Active', '1');
    localStorage.setItem('address','/clienttypemaster/dashboard');
    this.posts_ctm.length=0;
    this.fetch_data();
    this.updatectm=localStorage.getItem('updatectm')
    this.insertctm=localStorage.getItem('addctm')
    console.log(this.updatectm)
    if(this.updatectm=='0')
    {
       this.updt=true;
       console.log("A="+this.updatectm);
    }
    else
       {
         console.log("B="+this.updatectm);
         this.updt=false;
         localStorage.setItem('updatectm','0')

       }
       if(this.insertctm=='0')
       {
          this.insrt=true;
       }
       else
          {
            this.insrt=false;
            localStorage.setItem('addctm','0')
   
          }
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  public fetch_data(){
    this.querySubscription = this.apollo.watchQuery<any>({
      query: SHOW_CLIENT_TYPE,
      pollInterval: 40000,
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.posts_ctm = data;
       console.log(data)
        console.log(this.posts_ctm);
       this.putdata(this.posts_ctm);
      });



      // this.querySubscription = this.apollo.watchQuery<any>({
      //   query: SHOW_CLIENT_TYPE,
      //   pollInterval: 500,
      // })
      //   .valueChanges
      //   .subscribe(({ data, loading }) => {
      //     this.loading = loading;
      //     this.posts_ctm = data;
      //    console.log(data)
      //     console.log(this.posts_ctm);
      //    this.putdata(this.posts_ctm);
      //   });
  




    this.querySubscription = this.apollo.watchQuery<any>({
      query: SHOW_CLIENT_TYPE
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.posts_ctm = data;
       console.log(data)
        console.log(this.posts_ctm);
       this.putdata(this.posts_ctm);
      });


   

  }

public putdata(posts:any){
  this.dataSource=new MatTableDataSource(posts.getClientTypeData);
 
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
    this.router.navigate(['/clienttype/addctm'])
  }
  go_to_update(v1:any,v2:any){
    //console.log(v1,v2);
    this.router.navigate(['/clienttype/editctm',v1,v2])
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
    this.ctmid=v;
    console.log(this.ctmid);
  }
  delete_item(){
    // alert(this.ctmid);
  
    this.apollo.mutate({
      mutation:DEL_MAS,
      variables:{
        id:this.ctmid,
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
    });
  
  }
}
