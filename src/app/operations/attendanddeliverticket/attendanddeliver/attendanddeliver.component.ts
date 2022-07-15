import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import {ThemePalette} from '@angular/material/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DatePipe } from '@angular/common';



const UPDATE_TKT_STATUS=gql`
mutation  updateTktStatus($id:String!,$user_id:String!,$tkt_status:String!){
  
  updateTktStatus(id:$id,user_id:$user_id,tkt_status:$tkt_status){
    message
    success
    
  }
}


`


const GET_RAISETICKITE=gql`
query getSupportLogDtls($id:String!,$user_type:String!,$user_id:String!){
  getSupportLogDtls(id:$id,tag:"0",user_type:$user_type,user_id:$user_id){
    id
    client_name
    phone_no
    tkt_no
    emp_name
    priority
    tktStatus,
    tkt_status
    log_in
    work_status
    prob_reported
    client_type_id
  }
}`
;



const FETCH=gql`
query getSuppLogDone($user_type:String!,$user_id:String!){
  getSuppLogDone(user_type:$user_type , user_id:$user_id){
    id
    client_name
    phone_no
    tkt_no
    emp_name
    priority
    tktStatus
    log_in
    work_status
    tkt_status
    prob_reported
  }
}


`

@Component({
  selector: 'app-attendanddeliver',
  templateUrl: './attendanddeliver.component.html',
  styleUrls: ['./attendanddeliver.component.css', 
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class AttendanddeliverComponent implements OnInit {
  Tickite:any;
  attendtickite:boolean=true;
  displayedColumns: string[] = ['SL NO','Ticket_No', 'Client_Name','ticket_log_date','Assigned_to','Priority','Ticket_Status','Edit'];
  dataSource = new MatTableDataSource<any> (); 
  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dis:any;
  btn:any;
  new_value:any;
  old_value:any;
  passdata:any[]=[];
  emp:any;
  cli:any;
  cur_date:any;
  past_date:any;
  todayString  = new Date();
  cr:any=[];


  constructor(public _activateRoute:ActivatedRoute,private router:Router,private apollo:Apollo,private spinner:NgxSpinnerService,private datePipe:DatePipe) { }

  ngOnInit(): void {
    console.log(this._activateRoute.snapshot.params.id);
    
    if( localStorage.getItem('attendent')=='1'){
      this.attendtickite=false;
     }
    localStorage.setItem('address', '/operations/attendanddeliver');
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
    this.router.navigate(['/addclient/addcl'])   ; 
  }
  go_to_update(v1:any){
    this.router.navigate(['/operations/editattendanddeliver',v1,this._activateRoute.snapshot.params.id])
  }

  private fetch_data(){
    this.spinner.show();
    this.apollo.watchQuery<any>({
      query: GET_RAISETICKITE,
      variables:{
         id:"",
         user_type:localStorage.getItem('user_Type'),
         user_id:localStorage.getItem('UserId')
         
      },
      pollInterval:20000
      
    })
      .valueChanges
      .subscribe(({ data}) => {
        // if(this.new_value!=data.getSupportLogDtls.length){
          // if(this.old_value!=data.getSupportLogDtls.length){
            
          // }
          // this.old_value=data.getSupportLogDtls.length;
          // console.log(this.old_value);

          // console.log(this.new_value);
        // }
        
        
        for(let i=0;i<data.getSupportLogDtls.length;i++){
          if(data.getSupportLogDtls[i].tkt_status==''|| data.getSupportLogDtls[i].tkt_status!=null){

            this.dis=true;
          }
          

        }
     

        //  this.Tickite=data;

        //  for(let i=0;i<this.Tickite.getSupportLogDtls.length;i++){
        //   this.cur_date=this.datePipe.transform(this.todayString,'yyyy-MM-dd');
        //   this.past_date=this.datePipe.transform(this.Tickite.getSupportLogDtls[i].log_in,'yyyy-MM-dd');
          
        //   if(this.past_date < this.cur_date){
        //     console.log("less")
        //       this.cr[i]='red';
        //   }
        //   else{
        //     console.log("greater")
        //     this.cr[i]='black';
        //   }
        // }
        if(this._activateRoute.snapshot.params.id > 0){
          console.log(this._activateRoute.snapshot.params.id);
          
                 this.Tickite = data.getSupportLogDtls.filter((x:any) => x.client_type_id == 18);
        }
        else{
          console.log({"sad":this._activateRoute.snapshot.params.id});
          this.Tickite = data.getSupportLogDtls.filter((x:any) => x.client_type_id != 18); 
        }
        this.setColors();
        
         this.putdata(this.Tickite);
         this.spinner.hide();
      })

    
  }

  setColors(){
   
    for(let i=0;i<this.Tickite.length;i++){
      this.cur_date=this.datePipe.transform(this.todayString,'yyyy-MM-dd');
      this.past_date=this.datePipe.transform(this.Tickite[i].log_in,'yyyy-MM-dd');
      
      if(this.past_date < this.cur_date){
        console.log("less")
          this.cr[i]='red';
      }
      else{
        console.log("greater")
        this.cr[i]='black';
      }
    }
}
  private putdata(posts:any){
    this.dataSource=new MatTableDataSource(posts);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  LocalStorage(){
    localStorage.setItem('attendent','0');
    this.attendtickite=false;
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

  onToggle(event:any,id:any,Emp_name:any,Client_name:any){
   console.log(Emp_name,Client_name);
    this.btn = document.getElementById('av_'+id);
    if(event.checked == true){
      this.btn.removeAttribute('hidden');
      this.btn.style.display = "block";
      this.passdata.push(Emp_name);
      this.passdata.push(Client_name);
      this.emp=Emp_name;
      this.cli=Client_name;

    }else{
      this.btn.style.display = "none";
    }
    console.log("Slide Me:",event.checked);
   
    this.apollo.mutate({
      mutation:UPDATE_TKT_STATUS ,
      variables:{
        id:id,
       user_id: localStorage.getItem("UserId"),
        tkt_status: event.checked ? '4' : '0'

      }
    }).subscribe(({data})=>{
      console.log(data);

    })
    
  }




}
