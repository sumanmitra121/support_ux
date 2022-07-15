import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Apollo, gql } from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';



const GET_DROPDOWN = gql`
mutation updateUserType($id:String!,$user_type:String!,$user_id:String!){
  updateUserType(id:$id, user_type:$user_type, user_id:$user_id){
    success
    message
  }
}
`
  ;


const GET_STATUS = gql`
mutation updateUserStatus($id:String!,$user_status:String!,$user_id:String!){
  updateUserStatus(id:$id, user_status:$user_status, user_id:$user_id){
    success
    message
  }
}
`
  ;

const GET_DATA_A = gql`
query getUserDetailsA($tag:String!){
  getUserDetailsA(tag:$tag){
    id
    user_name
    user_type
    user_status
    login_status
  }
}`;
const GET_DATA_D = gql`
query getUserDetailsD($tag:String!){
  getUserDetailsD(tag:$tag){
    id
    user_name
    user_type
    user_status
    login_status
  }
}`;

@Component({
  selector: 'app-usermaintanance',
  templateUrl: './usermaintanance.component.html',
  styleUrls: ['./usermaintanance.component.css',
    '../../../../assets/masters_css_js/css/font-awesome.css',
    '../../../../assets/masters_css_js/css/apps.css',
    '../../../../assets/masters_css_js/css/apps_inner.css',
    '../../../../assets/masters_css_js/css/res.css']
})
export class UsermaintananceComponent implements OnInit {
  usertype:any;
  x:any;
  succed: any;
  stats: any;
  active1: boolean = false;
  active2: boolean = false;
  active_user: any;
  inactive_user: any;
  user_data: any;
  collect: any;
  data: any;
  active: any;
  deactive: any;
  a_status: any;
  d_status: any;
  displayedColumns: string[] = ['Username', 'UserType', 'Status','Login_Status'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private apollo: Apollo,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    localStorage.setItem('address', '/operations/Admin/usermaintanance')
    this.active_user = document.getElementById('a');
    this.inactive_user = document.getElementById('i');
    console.log("again")
    if (localStorage.getItem('Active') == '1') {
      this.active_user.checked = true;
      this.inactive_user.checked = false;
      this.fetch_data('1');
    }
    else {
      this.active_user.checked = false;
      this.inactive_user.checked = true;
      this.fetch_data('0');
    }

  }
  ngAfterViewInit() {
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
  sendstatus(v: any) {
    if(v=='1'){
      localStorage.setItem('Active', '1');

    }
    else{
      localStorage.setItem('Active', '0');

    }
    console.log("Valueeeeeee:", v)
    this.fetch_data(v);

  }

  fetch_data(v: any) {

    this.spinner.show();
    console.log("fetch_data:" + v);
    this.apollo.watchQuery<any>({
      query: v == '1' ? GET_DATA_A : GET_DATA_D,
      variables: {
        tag: v
      },
      pollInterval:40000
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        

        this.user_data = data;
        console.log("put_data:", v);
        console.log("yarn");
        this.spinner.hide();
        var method = v == '1' ? this.user_data.getUserDetailsA : this.user_data.getUserDetailsD;
        this.dataSource = new MatTableDataSource(method);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      })



  }




  select_none(v: any, v1: any) {
    console.log("myvalue:" + v);
    console.log("myvalue:" + v1);
    // console.log(localStorage.getItem('Code_no'));
    this.apollo
      .mutate({
        mutation: GET_DROPDOWN,
        variables: {
          id: v1,
          user_type:v,
          user_id: localStorage.getItem('UserId')

        },
        }).subscribe(({ data }) => {
        console.log(data);
        this.usertype=data;
        if(this.usertype.updateUserType.success>0){
          console.log(data);
          location.reload();
          //  localStorage.setItem('',v);
          //  console.log(localStorage.getItem('user_Type'))
        }
        else
         this.showsnackbar();

         },error=>{ this.showsnackbar();
        });
}
checkstat(v: any, v1: any) {
    console.log("active:" + v);
    console.log(v1);
    this.apollo
      .mutate({
        mutation: GET_STATUS,
        variables: {
          id: v1,
          user_status: v.toString(),
          user_id: localStorage.getItem('UserId')
        },
       }).subscribe(({ data }) => {
        console.log(data);
        this.succed = data
        localStorage.setItem('V',v);

        if (this.succed.updateUserStatus.success > 0) {
          console.log("fetch_data");
          this.stats = document.querySelector('input[name="status"]:checked');
          localStorage.setItem('Active', this.stats.value);
          location.reload();
         }

         else
         this.showsnackbar();

         },error=>{
          this.stats = document.querySelector('input[name="status"]:checked');
          localStorage.setItem('Active', this.stats.value);
          this.showsnackbar();
          location.reload();

         });
    }
    showsnackbar() {
      // alert("error");
       this.x = document.getElementById("snackbar");
       this.x.className = "show";
       setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
     }
}




