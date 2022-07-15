import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';


const SHOW_DASHBOARD=gql`
query clientGetTkt($client_id:String!){
  clientGetTkt(id: "",client_id:$client_id){
    tkt_no
    log_in
    work_status
    id
    assign_engg
    
  }
}`

const DELETED=gql`
mutation deleteTkt($id:String!) {

  deleteTkt(id:$id)  {

       success
       message

}
}`
;
 // id
    // client_name
    // phone_no
    // tkt_no
    // emp_name
    // priority
    // tktStatus
    // log_in
    // work_status

const FETCH=gql`
query getSuppLogDone($user_type:String!,$user_id:String!){
  getSuppLogDone(user_type:$user_type, user_id:$user_id){
    tkt_no
    log_in
    work_status
    id
    assign_engg
  }
}`
@Component({
  selector: 'app-clientraisetkt',
  templateUrl: './clientraisetkt.component.html',
  styleUrls: ['./clientraisetkt.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class ClientraisetktComponent implements OnInit {
  insertitckit:boolean=true;
  displayedColumns: string[] = ['Ticket_No','Log_date','Status','Edit','Delete'];
  dataSource = new MatTableDataSource<any> ();
  Tickite:any;
  cl:any;
  deleteticket:boolean=true;
  deleted:any;

  x:any;
  edit:boolean=true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private router:Router,private apollo:Apollo,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if(localStorage.getItem('editclientraisetickit')=='1'){
       this.edit=false;
    }

    if(localStorage.getItem('client_raiseticket')=='1'){
        this.insertitckit=false;
    }
    this.fetchdata();
  }
  go_to_AddItem(){
          this.router.navigate(['/Add/clientraisetkt']);
  }
  fetchdata(){

    this.spinner.show();

    this.apollo.watchQuery<any>({
      query: SHOW_DASHBOARD,
      variables:{
         id:"",
         client_id:localStorage.getItem('UserId'),
        },
      pollInterval: 20000
    })
      .valueChanges
      .subscribe(({ data}) => {
        console.log(data);
        this.Tickite=data;
        this.putdata(this.Tickite.clientGetTkt);
        this.spinner.hide();
      })

  }

  public putdata(posts:any){
    this.dataSource=new MatTableDataSource(posts);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  localstorage(){
    this.insertitckit=true;
    localStorage.setItem('client_raiseticket','0')

  }

  localstoragedelete(){
    this.deleteticket=true;
  }
  localstorage1(){
    this.edit=true;
    localStorage.setItem('editclientraisetickit','0')
  }

  go_to_update(v:any){
    console.log(v)
    this.router.navigate(['/Edit/clientraiseticket',v]).then(()=>{
      location.reload();
    })

  }

  delete(v:any){
    this.cl=v;
  }
  delete_item(){
      console.log("modal:" +this.cl);
      this.apollo
      .mutate({
        mutation:DELETED,
        variables:{
           id:this.cl
        }
      }).subscribe(({data})=>{console.log(data);
        this.deleted=data;
        if(this.deleted.deleteTkt.success==1){
            this.deleteticket=false;
            location.reload()

          }
        else
      this.showsnackbar();
      },error=>{ this.showsnackbar()
      });

    }
    showsnackbar() {
      // alert("error");
       this.x = document.getElementById("snackbar");
       this.x.className = "show";
       setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
     }
     sendstatus(v:any){
      if(v==1){
        this.fetchdata();
       }
       else{
        this.fetchdata_for_Done();
       }
    }
    public fetchdata_for_Done(){
      this.spinner.show();
      this.apollo.watchQuery<any>({
        query: FETCH,
        variables:{
           user_type:localStorage.getItem('user_Type'),
           user_id:localStorage.getItem('UserId')
           
        },
        // pollInterval:20000
        
      })
        .valueChanges
        .subscribe(({ data}) => {
          console.log(data);
          this.Tickite = data;
          this.putdata(this.Tickite.getSuppLogDone);
          this.spinner.hide();

        })
  
    }

}
