import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddclientdashboardComponent } from 'src/app/master/addclient/addclientdashboard/addclientdashboard.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
const srch_dt = gql`
query searchByDate($frm_dt: String!, $to_dt: String!, $user_id: String!,$user_type:String!){
  searchByDate(frm_dt: $frm_dt, to_dt: $to_dt, user_id: $user_id,user_type:$user_type){
    id
    log_in
    tkt_no
    client_name
    tktStatus
    emp_name
    work_status
  }
 }
`;

const searchByDateClient = gql`query searchByDateClient($frm_dt: String!,$to_dt: String!,$client_id: String!,$user_id: String!,$user_type: String!){
  searchByDateClient(frm_dt: $frm_dt,to_dt: $to_dt,client_id: $client_id,user_id: $user_id,user_type: $user_type){
    id,
    client_id,
    phone_no,
    client_name,
    prob_reported,
    emp_name,
    work_status,
    tkt_no
  }
}`;

const searchByDateEmp = gql`query searchByDateEmp($frm_dt: String!,$to_dt: String!,$emp_id: String!,$user_id: String!,$user_type: String!){
  searchByDateEmp(frm_dt: $frm_dt,to_dt: $to_dt,emp_id: $emp_id,user_id: $user_id,user_type: $user_type){
    id,
    client_id,
    phone_no,
    client_name,
    prob_reported,
    emp_name,
    work_status,
    tkt_no
  }
}`;
const GET_DETAILS=gql`
query getSupportLogDtls($id:String!,$user_type:String!,$user_id:String!){
  getSupportLogDtls(id:$id,user_type:$user_type,user_id:$user_id){
    assign_engg
    id
    client_name
    phone_no
    tkt_no
    emp_name
    priority
    tktStatus

    log_in
  }
}`;

const GET_EDITABLE=gql`
query getSupportLogDtls($id:String!,$user_type:String!,$user_id:String!){
  getSupportLogDtls(id:$id,user_type:$user_type,user_id:$user_id){
    id
    tkt_no
    client_name
     district_name
    client_type
    oprn_mode
    working_hrs
    amc_upto
    rental_upto
    phone_no
    priority
    module
    prob_reported
    assign_engg
    remarks
    tktStatus
    tkt_status
    emp_name,
    log_in,
    work_status
    call_attend
    delivery
  }
}`
;




@Component({
  selector: 'app-search-by-date',
  templateUrl: './search-by-date.component.html',
  styleUrls: ['./search-by-date.component.css',
    '../../../assets/css/bootstrap.css',
    '../../../assets/css/font-awesome.css',
    '../../../assets/css/apps.css',
    '../../../assets/css/apps_inner.css',
    '../../../assets/css/res.css']
})
export class SearchByDateComponent implements OnInit {
   showForm!:FormGroup;
  constructor(private datePipe: DatePipe,private fb:FormBuilder,private activatedroute: ActivatedRoute, private apollo: Apollo, private router: Router, private spinner: NgxSpinnerService) { 

    this.showForm= this.fb.group({
      date:[{value:'',disabled:true}],
      client:[{value:'',disabled:true}],
      district:[{value:'',disabled:true}],
      client_type:[{value:'',disabled:true}] ,  
      oprn_mode:[{value:'',disabled:true}],
      working_hrs:[{value:'',disabled:true}] ,  
      amc_upto:[{value:'',disabled:true}],
      rental_upto:[{value:'',disabled:true}],
      phoneno:[{value:'',disabled:true}],
      priority:[{value:'',disabled:true}],
      tkt_module:[{value:'',disabled:true}],
      prob_reported:[{value:'',disabled:true}] ,  
      assign_to:[{value:'',disabled:true}],
      attendedat:[{value:'',disabled:true}] ,  
      deliveryat:[{value:'',disabled:true}],
      ticketstatus:[{value:'',disabled:true}],
      work_status:[{value:'',disabled:true}],
      remarks:[{value:'',disabled:true}],
    })
  }
  from_date: any;
  to_date: any;
  posts: any;
  type: any;
  dt: any;
  _id: any;
  _type:any;
  public now: Date = new Date();
  user_type: any;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource([]);
  dlt = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.displayedColumns = atob(this.activatedroute.snapshot.params['type']) == 'D' ? ['Report Date', 'Ticket No.', 'Client Name', 'Assigned To', 'Status', 'View'] : atob(this.activatedroute.snapshot.params['type']) == 'E'  ? ['Assigned To','Client Name','prob_reported','Status','View']  : ['Ticket No.','Client Name','Assigned To','prob_reported','Status','View']
    this.from_date = this.activatedroute.snapshot.params['id1'];
    this.from_date = atob(this.from_date);
    this.to_date = this.activatedroute.snapshot.params['id2'];
    this.to_date = atob(this.to_date)
    this._id = atob(this.activatedroute.snapshot.params['name'])
    this._type= atob(this.activatedroute.snapshot.params['type'])

    if (localStorage.getItem('user_Type') == 'A' || localStorage.getItem('user_Type') == 'M') { this.type = ''; console.log("type=" + localStorage.getItem('user_Type')) }
    else
      this.type = localStorage.getItem('UserId');
    this.fetch_data();
  }
  fetch_data() {
    this.spinner.show();
    this.apollo.watchQuery<any>({
      query: atob(this.activatedroute.snapshot.params['type']) == 'D' ? srch_dt : atob(this.activatedroute.snapshot.params['type']) == 'E' ? searchByDateEmp : searchByDateClient,
      variables:
        atob(this.activatedroute.snapshot.params['type']) == 'D' ? {
          frm_dt: this.from_date,
          to_dt: this.to_date,
          user_id: this.type,
          user_type: localStorage.getItem('user_Type')
        } :
          atob(this.activatedroute.snapshot.params['type']) == 'E' ?
            {
              frm_dt: this.from_date,
              to_dt: this.to_date,
              emp_id: this._id,
              user_id: localStorage.getItem('user_Type') == 'A' || localStorage.getItem('user_Type') == 'M' ? '' : localStorage.getItem('UserId'),
              user_type: localStorage.getItem('user_Type')
            } : {
              frm_dt: this.from_date,
              to_dt: this.to_date,
              client_id: this._id,
              user_id: localStorage.getItem('user_Type') == 'A' || localStorage.getItem('user_Type') == 'M' ? '' : localStorage.getItem('UserId'),
              user_type: localStorage.getItem('user_Type')
            },
    })
      .valueChanges
      .subscribe(({ data }) => {

        this.posts = data;
        console.log(this.posts);
        this.putdata(this.posts);
        this.spinner.hide();
      });

  }
  // view_page(v: any) {
  //   this.user_type = localStorage.getItem('user_Type')
  //   this.router.navigate(['/view', btoa(v), btoa(this.user_type)])

  // }
  public putdata(posts: any) {
    this.dataSource = new MatTableDataSource(atob(this.activatedroute.snapshot.params['type']) == 'D' ? posts.searchByDate : atob(this.activatedroute.snapshot.params['type']) == 'E' ? posts.searchByDateEmp : posts.searchByDateClient);
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

  view_page(v: any) {
       this.get_details(v);
       this.get_editable(v);
}
  get_details(_id:any){
    this.apollo.watchQuery<any>({
      query: GET_DETAILS,
      variables:{
         id:_id,
         user_type:localStorage.getItem('user_Type'),
         user_id:localStorage.getItem('UserId')
      },
      pollInterval: 500
    })
      .valueChanges.subscribe(({ data}) => {
      this.showForm.patchValue({
        date:this.datePipe.transform(data.getSupportLogDtls[0].log_in , 'dd-MM-yyyy h:mm:ss a'),
        client:data.getSupportLogDtls[0].client_name,
        phoneno:data.getSupportLogDtls[0].phone_no,
        priority:data.getSupportLogDtls[0].priority,
        ticketstatus:data.getSupportLogDtls[0].tktStatus,
      })
      })
     
  }
  get_editable(_id:any){
    this.apollo.watchQuery<any>({
      query: GET_EDITABLE,
      variables:{
         id:_id,
         user_type:localStorage.getItem('user_Type'),
         user_id:localStorage.getItem('UserId')
      },
       pollInterval:500
    })
      .valueChanges
      .subscribe(({ data}) => {
           this.showForm.patchValue({  
            tkt_module:data.getSupportLogDtls[0].module,
            prob_reported:data.getSupportLogDtls[0].prob_reported,  
            assign_to:data.getSupportLogDtls[0].emp_name,
            attendedat:this.datePipe.transform(data.getSupportLogDtls[0].call_attend , 'dd-MM-yyyy'),  
            deliveryat:this.datePipe.transform(data.getSupportLogDtls[0].delivery , 'dd-MM-yyyy'),
            work_status:data.getSupportLogDtls[0].work_status > 0 ? 'Done' : 'Pending',
            remarks:data.getSupportLogDtls[0].remarks,
            district:data.getSupportLogDtls[0].district_name,
            client_type:data.getSupportLogDtls[0].client_type ,  
            oprn_mode:data.getSupportLogDtls[0].oprn_mode,
            working_hrs:data.getSupportLogDtls[0].working_hrs ,  
            amc_upto:this.datePipe.transform(data.getSupportLogDtls[0].amc_upto, 'dd-MM-yyyy'),
            rental_upto:this.datePipe.transform(data.getSupportLogDtls[0].rental_upto, 'dd-MM-yyyy'),
           })
       })
  }
}
