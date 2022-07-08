import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {Apollo, gql} from 'apollo-angular';
const SHOW_EMP=gql`
query{
  getEmp(id:""){
    id
    emp_code
    emp_name
  }
}`;
const DEL_EMP=gql`
mutation deleteEmp($id: String){
  deleteEmp(id:$id){
    success
    message
  }
}`;
// export interface PeriodicElement {
//   Sl_No: any;
//   Employee_Code: any;
//   Name:any;
//   Edit:any;
  
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     Sl_No: 1,
//     Employee_Code:1,
//     Name: 'abc',
//     Edit:''
   
//   }, 
  
// ];
@Component({
  selector: 'app-addempdashboard',
  templateUrl: './addempdashboard.component.html',
  styleUrls: ['./addempdashboard.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class AddempdashboardComponent implements OnInit {
  dlt=true;
  displayedColumns: string[] = ['Sl_No', 'Employee_Code','Name','Edit','Delete'];
  dataSource = new MatTableDataSource; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  updt=true;
  insrt=true;
  updatee:any;
  inserte:any;
  userdel:any;
empid:any;
  loading: boolean=false;
  posts_emp: any;
  private querySubscription: Subscription = new Subscription;
  constructor(private router:Router,private apollo:Apollo) { }
 x:any;

  ngOnInit(): void {
    localStorage.setItem('Active', '1');
    localStorage.setItem('address', '/addemp/dashboard');

    console.log(this.updt);
    this.updatee=localStorage.getItem('updatee');
    this.inserte=localStorage.getItem('adde');
    console.log(this.updatee);
    if(this.updatee=='0')
    {
       this.updt=true;
    }
    else
       {
         this.updt=false;
         localStorage.setItem('updatee','0')

       }
       if(this.inserte=='0')
       {
          this.insrt=true;
       }
       else
          {
            this.insrt=false;
            localStorage.setItem('adde','0')
   
          }

    this.fetch_data();
    //this.fetch_data();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  fetch_data(){
    this.querySubscription = this.apollo.watchQuery<any>({
      query: SHOW_EMP,
      pollInterval:40000
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.posts_emp = data;
        console.log(this.posts_emp);
       this.putdata(this.posts_emp);
      });

  }
  private putdata(posts:any){
    this.dataSource=new MatTableDataSource(posts.getEmp);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  go_to_AddItem(){
    this.router.navigate(['/addemp/adde'])   ; 
  }
  go_to_update(v1:any,v2:any,v3:any){
    //console.log(v1+" "+v2+" "+" "+v3);
    this.router.navigate(['/addemp/editemp',v1,v2,v3])
  }
  showsnackbar() {
    // alert("error");
     this.x = document.getElementById("snackbar");
     this.x.className = "show";
     setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
   }
  delete(v:any){this.empid=v}
  delete_item(){ this.apollo.mutate({
    mutation:DEL_EMP,
    variables:{
      id:this.empid,
      // name:v2,
      // user_id:localStorage.getItem("UserId")
      
    }
  }).subscribe(({data})=>{this.userdel=data;console.log(data);
    console.log("data:" +JSON.stringify(data))
    console.log(this.userdel.deleteEmp.message)
    if(this.userdel.deleteEmp.success==1)
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
