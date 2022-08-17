import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'
import {Apollo, gql} from 'apollo-angular';
import { Subscription } from 'rxjs';
const DEL_MAS = gql`
mutation deleteMaster($id: String!){
  deleteMaster(id: $id, db_type: 5){
    success
    message
  }
}
`;
const SHOW_MM=gql`
query{
  getModuleTypeData(id:"", db_type: 5){
    module_id
    module_type
  }
}`

// export interface PeriodicElement {
//   Sl_No: any;
//   Module: any;
//   Edit:any;
  
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     Sl_No: 1,
//     Module: 'abc',
//     Edit:''
   
//   }, 
  
// ];
@Component({
  selector: 'app-mmdashboard',
  templateUrl: './mmdashboard.component.html',
  styleUrls: ['./mmdashboard.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class MmdashboardComponent implements OnInit {

  displayedColumns: string[] = ['Sl_No', 'Module','Edit','Delete'];
  dataSource = new MatTableDataSource; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  updt=true;
  insrt=true;
  userdel:any;
  updatemm:any;
  insertmm:any;
  dlt=true;
  loading: boolean=false;
  posts_mm: any;
  mmid:any;
  private querySubscription: Subscription = new Subscription;
  constructor(private router:Router,private apollo:Apollo) { }
  x:any;

  ngOnInit(): void {
    localStorage.setItem('Active', '1');

    localStorage.setItem('address','/mastermodule/dashboard'); 

    this.updatemm=localStorage.getItem('updatemm')
    this.insertmm=localStorage.getItem('addmm')
    console.log(this.updatemm)
    if(this.updatemm=='0')
    {
       this.updt=true;
    }
    else
       {
         this.updt=false;
         localStorage.setItem('updatemm','0')

       }
       if(this.insertmm=='0')
       {
          this.insrt=true;
       }
       else
          {
            this.insrt=false;
            localStorage.setItem('addmm','0')
   
          }

    this.fetch_data();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  fetch_data(){
    this.querySubscription = this.apollo.watchQuery<any>({
      query: SHOW_MM,
      pollInterval:40000
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.posts_mm = data;
        console.log(this.posts_mm);
       this.putdata(this.posts_mm);
      });

  }
  private putdata(posts:any){
    this.dataSource=new MatTableDataSource(posts.getModuleTypeData);
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
    this.router.navigate(['/mastermodule/addmm'])
  }
  go_to_update(v1:any,v2:any){
    this.router.navigate(['/mastermodule/editmm',v1,v2])
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
  delete(v:any){this.mmid=v}
  delete_item(){this.apollo.mutate({
    mutation:DEL_MAS,
    variables:{
      id:this.mmid,
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
