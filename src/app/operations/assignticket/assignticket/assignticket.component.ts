import { DatePipe } from '@angular/common';
import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';

declare const $: any;

const GET_RAISETICKITE=gql`
query getSupportLogDtls($id:String!,$user_type:String!,$user_id:String!){
  getSupportLogDtls(id:$id,tag:"2",user_type:$user_type,user_id:$user_id){
     id
    client_name
    phone_no
    tkt_no
    emp_name
    priority
    tktStatus
    log_in
    assign_engg
    prob_reported
    client_type_id
  }
}`
;

// const GET_ATTENDED_DELIVERTICKITE=gql`
// query getSupportLogDtls($id:String!,$user_type:String!,$user_id:String!){
//   getSupportLogDtls(id:$id,tag:"0",user_type:$user_type,user_id:$user_id){
//     id
//     client_name
//     phone_no
//     tkt_no
//     emp_name
//     priority
//     tktStatus,
//     tkt_status
//     log_in
//     work_status
//     prob_reported
//   }
// }`
// ;


const FOR_GET_EMPLOYEE=gql`
query{
  getEngList{
  id
  emp_name
  emp_code
  user_type
}
}`
;
const FOR_EMPLOYEE=gql`
mutation  updateAssignEng($user_id:String!, $id: String!, $assign_engg: String!){
  updateAssignEng(user_id:$user_id, id:$id, assign_engg:$assign_engg){
    message
    success
  }
}

`




@Component({
  selector: 'app-assignticket',
  templateUrl: './assignticket.component.html',
  styleUrls: ['./assignticket.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css'

]
})
export class AssignticketComponent implements OnInit {

  displayedColumns: string[] = ['SL NO','Ticket_No', 'Client_Name','Assigned_to','Priority','Ticket_Status','ticket_log_date','Edit'];
  dataSource = new MatTableDataSource<any> ();
  ctmdata:any;
  s:any;
  pop:boolean=true;
  Tickite:any;
  edittickit:boolean=true;
  popup:any;
  todayString  = new Date();
  old_value:any;
  new_value:any;
  cr:any=[];
  cur_date:any;
  past_date:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(public _activatedRoute:ActivatedRoute,private router:Router,private apollo:Apollo,private spinner: NgxSpinnerService,private datePipe:DatePipe) { }

  ngOnInit(): void {
    console.log('ss');

    this.apollo.watchQuery<any>({
      query: FOR_GET_EMPLOYEE

    })
      .valueChanges
      .subscribe(({ data}) => {
        console.log(data);
        if(this._activatedRoute.snapshot.params.id > 0){

           this.ctmdata = data.getEngList.filter((x:any) => x.user_type =='W');
          console.log(this.ctmdata)
        }
        else{
          this.ctmdata = data.getEngList.filter((x:any) => x.user_type !='W');

        }
        console.log(this.ctmdata);

  })

  console.log(this._activatedRoute.snapshot.params.id);

  if( localStorage.getItem('edittickit')=='1'){
            this.edittickit=false;
       }

    localStorage.setItem('address', '/operations/assignticket');
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
    this.router.navigate(['/addclient/addcl']);
  }
  go_to_update(v1:any){
    console.log("v1:" +v1);
    this.router.navigate(['/operations/editassignticket',v1,this._activatedRoute.snapshot.params.id])
  }



  // public select_client(v:any){}

  private fetch_data(){




  // $('#client').on("change",  (e:any) => {
  //  console.log(e);
  //  console.log("select2:select" + e.params.data.id);
  //  console.log("select2:select" + e.params.data.text);

  // })



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

        //  this.Tickite=data;
        // console.log(this.Tickite)
        // console.log(this.datePipe.transform(this.Tickite.getSupportLogDtls[0].log_in,'yyyy-MM-dd')+ " " +this.datePipe.transform(this.todayString,'yyyy-MM-dd'));
        // for(let i=0;i<this.Tickite.getSupportLogDtls.length;i++){
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
            console.log(this._activatedRoute.snapshot.params.id);

        if(this._activatedRoute.snapshot.params.id > 0){
          console.log(this._activatedRoute.snapshot.params.id);

                 this.Tickite = data.getSupportLogDtls.filter((x:any) => x.client_type_id == 18);
        }
        else{
          console.log({"sad":this._activatedRoute.snapshot.params.id});
          this.Tickite = data.getSupportLogDtls.filter((x:any) => x.client_type_id != 18);
        }
        console.log(this.Tickite);
        this.setColors()


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
  localStorage(){
    localStorage.setItem('edittickit','0');
    this.edittickit=true;
}

SHOW_Employee(v:any,v1:any){
  console.log("v:"+v);

  this.apollo.mutate({
    mutation: FOR_EMPLOYEE,
    variables:{
      user_id: localStorage.getItem("UserId"),
      id:v1,
      assign_engg:v,
      }
  }).subscribe(({data})=>{
    console.log(data);

    this.s=data;
    console.log("Suceess:", this.s.updateAssignEng.success)
    if(this.s.updateAssignEng.success>0){
          location.reload();
    }
    else{
              console.log("reload")
    }
  })



}








}
