import { Component, OnInit,ViewChild  } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Apollo, gql} from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';
const srch_tkt=gql`query searchByTktNo($tkt_no:String!,$user_id:String!,$user_type:String!){
  searchByTktNo(tkt_no: $tkt_no, user_id: $user_id,user_type:$user_type){
    id
    log_in
    tkt_no
    client_name
    tktStatus
    emp_name
    work_status
  }
 }`;


@Component({
  selector: 'app-search-by-ticket',
  templateUrl: './search-by-ticket.component.html',
  styleUrls: ['./search-by-ticket.component.css',
  '../../../assets/css/font-awesome.css',
  '../../../assets/css/apps.css',
  '../../../assets/css/apps_inner.css',
   '../../../assets/css/res.css'
]
})
export class SearchByTicketComponent implements OnInit {
  type: any;
  posts:any;
  user_type: any;;


  constructor(private activatedroute:ActivatedRoute,private apollo:Apollo,private router:Router,private spinner:NgxSpinnerService) { }
  tkt:any;
  displayedColumns: string[] = ['Report Date', 'Ticket No.','Client Name','Assigned To', 'Status','View'];
  dataSource = new MatTableDataSource([]);
 dlt=true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
 this.tkt=this.activatedroute.snapshot.params['id'];
    this.tkt=atob(this.tkt);
    console.log(this.tkt);
    if(localStorage.getItem('user_Type')=='A'||localStorage.getItem('user_Type')=='M')
    {this.type=''; console.log("type="+localStorage.getItem('user_Type'))}
    else
    this.type=localStorage.getItem('UserId');
    this.fetch_data();
 


  }
  fetch_data(){
    this.spinner.show();
    this.apollo.watchQuery<any>({
     query: srch_tkt,
     variables:{
       tkt_no:this.tkt,

       user_id:this.type,
       user_type:localStorage.getItem('user_Type')
     }
   })
     .valueChanges
     .subscribe(({ data }) => {

       this.posts = data;

       console.log(this.posts);
      this.putdata(this.posts);
      this.spinner.hide();
     });
    }
    view_page(v:any){
      console.log(v+" "+localStorage.getItem('user_Type'));
      this.user_type=localStorage.getItem('user_Type')
      this.router.navigate(['/view',btoa(v),btoa(this.user_type)])
    }
  public putdata(posts:any){
    this.dataSource=new MatTableDataSource(posts.searchByTktNo);

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
}
