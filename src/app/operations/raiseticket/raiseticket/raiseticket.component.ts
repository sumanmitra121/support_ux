import { DatePipe } from '@angular/common';
import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';


// For getting the details in dashboard page
const GET_RAISETICKITE=gql`
query getSupportLogDtls($id:String!,$user_type:String!,$user_id:String!){
  getSupportLogDtls(id:$id,user_type:$user_type,user_id:$user_id,tag:"1"){
    assign_engg
    id
    client_name
    phone_no
    tkt_no
    emp_name
    priority
    tktStatus
    log_in
    work_status
  }
}`
;

const DELETED=gql`
mutation deleteTkt($id:String!) {

  deleteTkt(id:$id)  {

       success
       message

}
}`
;




const FETCH=gql`
query getSuppLogDone($user_type:String!,$user_id:String!){
  getSuppLogDone(user_type:$user_type, user_id:$user_id){
    id
    client_name
    phone_no
    tkt_no
    emp_name
    priority
    tktStatus
    log_in
    work_status
  }
}


`

@Component({
  selector: 'app-raiseticket',
  templateUrl: './raiseticket.component.html',
  styleUrls: ['./raiseticket.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class RaiseticketComponent implements OnInit {
  insertitckit:boolean=true;
  deleteticket:boolean=true;
  deleted:any;
  cl:any;
  x:any;
  d_icon:any;
  u_type:any;
  cur_date:any;
  past_date:any;
  todayString  = new Date();
  cr:any=[];
  // assign_eng:any;

  displayedColumns: string[] = ['Sl No','Ticket_No', 'Client_Name','Phone_no','Priority','ticket_log_date','Edit','Delete'];
  dataSource = new MatTableDataSource<any> ();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

   Tickite:any;
   edittickite:boolean=true;
  constructor(private router:Router,private apollo:Apollo,private spinner:NgxSpinnerService,private datePipe:DatePipe) { }

  ngOnInit(): void {
    // if(localStorage.getItem('editraisetickit')=='1'){
    //   this.deleteticket=false;
    //   this.edittickite=false;
    //   this.insertitckit=true;
    //   localStorage.setItem('deletetickit','0');
    
    // }

    if(localStorage.getItem('delete')=='1'){
      localStorage.setItem('delete','0');
      this.deleteticket=false;
    }
    if(localStorage.getItem('editraisetickit')=='1'){
       this.edittickite=false;
       this.insertitckit=true;
       localStorage.setItem('insertickit','0');

    }
    if( localStorage.getItem('insertickit')== '1'){
           this.insertitckit=false;
           this.edittickite=true;

    }

    localStorage.setItem('address','/operations/raiseticket');
    localStorage.setItem('Active', '1');

    this.fetch_data();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  go_to_AddItem(){
    this.router.navigate(['/operations/addraiseticket']);
  }
  go_to_update(v1:any){
    this.router.navigate(['/operations/editeraiseticket',v1])
  }
  private fetch_data(){
    this.spinner.show();
    console.log({user_type:localStorage.getItem('user_Type'), user_id:localStorage.getItem('UserId')});

    this.apollo.watchQuery<any>({
      query: GET_RAISETICKITE,
      variables:{
         id:"",
         user_type:localStorage.getItem('user_Type'),
         user_id:localStorage.getItem('UserId')


      },
      pollInterval: 20000


    })
      .valueChanges
      .subscribe(({ data}) => {

         this.Tickite=data;
        //  console.log(this.Tickite)
        //  console.log(this.Tickite.getSupportLogDtls[0].assign_engg)
        //  for(let i=0;i<this.Tickite.getSupportLogDtls.length;i++){
        //      if(this.Tickite.getSupportLogDtls[i].assign_engg>0 &&this.Tickite.getSupportLogDtls[i].assign_engg!=null){
        //            this.d_icon=document.getElementsByClassName('deleted') ;
        //            this.d_icon.style.color='grey';
        //      }
        //  }
        for(let i=0;i<this.Tickite.getSupportLogDtls.length;i++){
          this.cur_date=this.datePipe.transform(this.todayString,'yyyy-MM-dd');
          this.past_date=this.datePipe.transform(this.Tickite.getSupportLogDtls[i].log_in,'yyyy-MM-dd');
          
          if(this.past_date < this.cur_date){
            console.log("less")
              this.cr[i]='red';
          }
          else{
            console.log("greater")
            this.cr[i]='black';
          }
        }

         this.putdata(this.Tickite);
         this.spinner.hide();
      })


  }

  showsnackbar() {
    // alert("error");
     this.x = document.getElementById("snackbar");
     this.x.className = "show";
     setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
   }
  private putdata(posts:any){
    this.dataSource=new MatTableDataSource(posts.getSupportLogDtls);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  localstorage(){
    this.insertitckit=true;
    localStorage.setItem('insertickit','0');
  }
  go_to(){

    this.edittickite=true;
    localStorage.setItem('editraisetickit','0')
  }
  //  For delete the raise ticket
  delete(v:any){
    this.cl=v;
  }
  delete_item(){
      console.log("modal:" +this.cl);
      this.apollo
      .mutate({
        mutation: DELETED,
        variables:{
           id:this.cl
        }
      }).subscribe(({data})=>{console.log(data);
        this.deleted=data;
        if(this.deleted.deleteTkt.success==1){
          location.reload();
          localStorage.setItem('delete','1')
            // this.deleteticket=false;
            
          }
        else
        {
          localStorage.setItem('delete','0');
          this.showsnackbar();
        }
     
      },error=>{ this.showsnackbar()
      });

    }
    deletestorage(){
      localStorage.setItem('delete','0');
      this.deleteticket=true;
      
    }




    public fetchdata_for_Done(){
      this.spinner.show();
      this.apollo.watchQuery<any>({
        query: FETCH,
        variables:{
           user_type:localStorage.getItem('user_Type'),
           user_id:localStorage.getItem('UserId')
           
        },
        pollInterval:20000
        
      })
        .valueChanges
        .subscribe(({ data}) => {
          console.log(data);
  
           this.Tickite=data;
          //  for(let i=0;i<this.Tickite.getSuppLogDone.length;i++){
          //   this.cur_date=this.datePipe.transform(this.todayString,'yyyy-MM-dd');
          //   this.past_date=this.datePipe.transform(this.Tickite.getSuppLogDone[i].log_in,'yyyy-MM-dd');
            
          //   if(this.past_date < this.cur_date){
          //     console.log("less")
          //       this.cr[i]='red';
          //   }
          //   else{
          //     console.log("greater")
          //     this.cr[i]='black';
          //   }
          // }
           this.putdata1(this.Tickite);
           this.spinner.hide();
        })
  
  
  
    }
  
    private putdata1(posts:any){
      this.dataSource=new MatTableDataSource(posts.getSuppLogDone);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }



    sendstatus(v:any){
      if(v==1){
        this.fetch_data();
       }
       else{
        this.fetchdata_for_Done();
       }

    }

}
