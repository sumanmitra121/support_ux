import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Router} from '@angular/router'
import {Apollo, gql} from 'apollo-angular';
const SHOW_CLIENT=gql`
query getClient($active: String){
  getClient(id:"", active: $active){
    id
    client_name
    client_type
    phone_no
    district_name
  }
}`
const DEL_CLI=gql`
mutation deleteClient($id: String){
  deleteClient(id: $id){
    success
    message
  }
}`;
// export interface PeriodicElement {
//   Sl_No: any;
//   Client_Code: any;
//   Name:any;
//   Type:any;
//   Phone:any;
  
  
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     Sl_No: 1,
//     Client_Code:1,
//     Name: 'abc',
//     Type:'',
//     Phone:'123',
    
   
//   }, 
  
// ];

@Component({
  selector: 'app-addclientdashboard',
  templateUrl: './addclientdashboard.component.html',
  styleUrls: ['./addclientdashboard.component.css', 
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class AddclientdashboardComponent implements OnInit {


  displayedColumns: string[] = ['Client_Code','Name','Type','Phone','District','Edit','Delete'];

  
 x:any;
  dataSource = new MatTableDataSource; 
cl:any;
userdel:any;
dlt=true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  updt=true;
  insrt=true;
  updatec:any;
  insertc:any;
 
  constructor(private router:Router,private apollo:Apollo) { }
  posts:any;
  ngOnInit(): void {
    localStorage.setItem('Active', '1');
    localStorage.setItem('address', '/addclient/dashboard');

    this.updatec=localStorage.getItem('updatec')
    this.insertc=localStorage.getItem('addc')
    console.log(this.updatec)
    if(this.updatec=='0')
    {
       this.updt=true;
    }
    else
       {
         this.updt=false;
         localStorage.setItem('updatec','0')

       }
       if(this.insertc=='0')
       {
          this.insrt=true;
       }
       else
          {
            this.insrt=false;
            localStorage.setItem('addc','0')
   
          }

    this.fetch_data(1);
    //this.fetch_data(1);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
 
  fetch_data(v:any){
    this.apollo.watchQuery<any>({
      query: SHOW_CLIENT,
      pollInterval:40000,
      variables:{
        active:v.toString()
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        
        this.posts = data;
       console.log(data)
        console.log(this.posts);
       this.putdata(this.posts);
      });

  }
  private putdata(posts:any){
    this.dataSource=new MatTableDataSource(posts.getClient);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  go_to_AddItem(){
    this.router.navigate(['/addclient/addcl']); 
  }
  go_to_update(v1:any){
    this.router.navigate(['/addclient/editclient',v1]).then(()=> {
      location.reload();
    })
  }
  showsnackbar() {
    // alert("error");
     this.x = document.getElementById("snackbar");
     this.x.className = "show";
     setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
   }
delete(v:any){this.cl=v;}
delete_item(){this.apollo.mutate({
  mutation:DEL_CLI,
  variables:{
    id:this.cl,
    // name:v2,
    // user_id:localStorage.getItem("UserId")
    
  }
}).subscribe(({data})=>{this.userdel=data;console.log(data);
  console.log("data:" +JSON.stringify(data))
  console.log(this.userdel.deleteClient.message)
  if(this.userdel.deleteClient.success==1)
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
sendstatus(v:any){
  this.fetch_data(v);
  //this.fetch_data(v);
}
}
