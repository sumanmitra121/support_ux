import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {Chart } from 'chart.js';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Apollo, gql } from 'apollo-angular';
import { global } from 'src/app/global';
// For client Last ticket of current day
const CLIEN_LAST_TKT_OF_CURRENT_DAY=gql`
query  clientLastTke($user_id: String!){
  clientLastTke(user_id:$user_id){
    id
    emp_name
    email
    phone_no
    tkt_no
    log_in
    assign_engg
    work_status
    tktStatus
  }
}`

// For client Monthly tickite
const CLIENT_MONTHLY_TKT=gql`

query  clientMonthlySupport($user_id:String!){
  clientMonthlySupport(user_id:$user_id){
    no_tkt
    date_name
  }
}`

// FOR GETTING NUMBER OF TICKITES OPEN,CLOSE AND TOTAL FOR CLIENT
const CLIENT_OPEN_CLOSE_TOTAL_TICKITE=gql`
query  clientOpenCloseTkt($user_id:String!){
  clientOpenCloseTkt(user_id: $user_id){
    opened
    closed
  }
}`
// For getting employee details
const GET_PROFILE=gql`
query getProfileDtls($user_email:String!,$user_type:String!){
  getProfileDtls(user_email:$user_email, user_type: $user_type){
    id
    user_type
    emp_code
    emp_name
    phone_no
    email
    emp_designation
    remarks
    client_name
    district_id
    client_type_id
    oprn_mode_id
    client_addr
    working_hrs
    amc_upto
    rental_upto
    image
  }
}`;

const GET_CLIENT_TICKITES_DETAILS=gql`
query clientGetTktDashboard($client_id:String!){
  clientGetTktDashboard(client_id:$client_id){
    id
    tkt_no
    tktStatus
    work_status
    assign_engg
    log_in
    emp_name
    email
  }
}`;

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


const SHOW_EMPLOYWW=gql`
query workDone($user_type:String!,$user_id:String!){
  workDone(user_type:$user_type, user_id:$user_id){
    done
    emp_name
  }
}`

const TKT=gql`
query openTktByStatus($user_type:String!, $user_id: String!){
  openTktByStatus(user_type:$user_type, user_id:$user_id){
    tkt_status
    status
  }
}`


const TOTAL_TKT=gql`
query  closeTkt($user_type: String!, $user_id: String!){
  closeTkt(user_type:$user_type,user_id:$user_id){
    today
    yesterday
    this_month
    last_month
    this_year
    lifetime
  }
}`

const OPEN_CLOSE_TKT=gql`
query  openCloseTkt($user_type: String!, $user_id: String!){
  openCloseTkt(user_type: $user_type, user_id: $user_id){
    opened
    closed
  }
}`
const LAST_SEVEN=gql`
query totalTktByDate($user_type:String!,$user_id:String!){
  totalTktByDate(user_type: $user_type, user_id: $user_id){
    no_tkt
    date_name
  }
}`;

const CHART_PIE=gql`
query totalTktByClient($user_type: String!, $user_id: String!){
  totalTktByClient(user_type: $user_type, user_id:$user_id){
    total_tkt
    client_type
  }
}`;





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css',
  '../../assets/css/font-awesome.css',
  '../../assets/css/apps.css',
  '../../assets/css/apps_inner.css',
   '../../assets/css/res.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {
   Tkt_no:any;
   _tkt_status:any;
   displayedColumns2: string[] = ['position','tkt_no', 'Log', 'Assignedto', 'Action'];
  // dataSource2 = ELEMENT_DATA;
  dataSource2 = new MatTableDataSource<any>();

  displayedColumns1: string[] = ['Id','Status','Count'];
  dataSource1 = new MatTableDataSource<any>();
  displayedColumns: string[] = ['imge','Username','Login_Status'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  show_profile:boolean=true;
  details_tickite:any=[];
  colors1:any=[];
  colors2:any=[];
  colors3:any=[];
  no_tkt:any=[];
  date_time:any=[];
   bar:any;
   tkt:any;
   t:any;
   total:any=[];
   cli_typ:any=[];
   background_color_for_1st_pie_chart:any=[];
  // myChart:any=[];
  uri=global.img;
  Email:any;
  pn:any;
  i:any;
  EMP_NAME:any;
  piechart:any;
  pi:any;
  user_data:any;
  breakpoint:any;
  today:any;
  yesterday:any;
  this_month:any;
  last_month:any;
  this_year:any;
  lifetime:any;
   Done:any=[];
   Emp:any=[];
   tkt_stat:any=[];
   stat:any=[];
   u_type:any;
   op:any;
   tot:any;
   colors4:any=[];
   clos:any;
   randomColor:any
  formattedDate : any;
  details:any;
  employee_name:any;
  employee_phone:any;
  employee_email:any;
  emp_img:any;
  emp_id:any;
  client_last_tkt_no:any;
  client_last_tkt_log_date:any;
  client_last_tkt_wrk_status:any;
  
  constructor(private router:Router,private apollo:Apollo) {

  }

  ngOnInit(): void {
  // For Client Last tickit of Current day
    this.apollo.watchQuery<any>({
      query:CLIEN_LAST_TKT_OF_CURRENT_DAY,
      variables:{
        user_id:localStorage.getItem('UserId')
      },
      pollInterval:40000,
      fetchPolicy:'cache-and-network'
    }).valueChanges.subscribe(({data})=>{
          console.log(data);
          this.employee_name=data.clientLastTke[0].emp_name;
          this.employee_email=data.clientLastTke[0].email;
          this.employee_phone=data.clientLastTke[0].phone_no;
          this.emp_img=data.clientLastTke[0].image?this.uri+data.clientLastTke[0].image:'/assets/profile.png';
          this.emp_id=data.clientLastTke[0].assign_engg;
          this.client_last_tkt_no=data.clientLastTke[0].tkt_no;
          this.client_last_tkt_log_date=data.clientLastTke[0].log_in;
          this.client_last_tkt_wrk_status=data.clientLastTke[0].work_status;
          this._tkt_status = data.clientLastTke[0].tktStatus;
          this.Tkt_no = data.clientLastTke[0].tkt_no;
          console.log("Employee PhoneNo." +this.employee_phone);
          



    })

  

    
    this.randomColor = Math.floor(Math.random()*16777215).toString(16);
    this.fetch_data();
    // this.fetch_data1();


     this.u_type = localStorage.getItem('user_Type');

     localStorage.setItem('Active', '1');
     localStorage.setItem('address', '/dashboard');
     localStorage.setItem('updatectm', '0');
     localStorage.setItem('addctm', '0');
     localStorage.setItem('updateom', '0');
     localStorage.setItem('addom', '0');
     localStorage.setItem('updatets', '0');
     localStorage.setItem('addts', '0');
     localStorage.setItem('updatepm', '0');
     localStorage.setItem('addpm', '0');
     localStorage.setItem('updatemm', '0');
     localStorage.setItem('addmm', '0');
     localStorage.setItem('adde', '0');
     localStorage.setItem('updatee', '0');
     localStorage.setItem('updatec', '0');
     localStorage.setItem('addc', '0');

     this.apollo.watchQuery<any>({
      query:TOTAL_TKT,
      variables: {
        user_type:localStorage.getItem('user_Type'),
        user_id:localStorage.getItem('UserId')

      },
      pollInterval:40000
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        console.log(data);


        this.today = data.closeTkt[0].today;
        this.yesterday= data.closeTkt[0].yesterday;
        this.this_month= data.closeTkt[0].this_month;
        this.last_month= data.closeTkt[0].last_month;
        this.this_year= data.closeTkt[0].this_year;
        this.lifetime= data.closeTkt[0].lifetime;

        

      })




     this.apollo.watchQuery<any>({
      query: localStorage.getItem('user_Type') != 'C' ? OPEN_CLOSE_TKT : CLIENT_OPEN_CLOSE_TOTAL_TICKITE,
      variables: {
        user_type:localStorage.getItem('user_Type'),
        user_id:localStorage.getItem('UserId')

      },
      pollInterval:40000
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
      
        this.tkt = localStorage.getItem('user_Type') != 'C' ? data.openCloseTkt[0] : data.clientOpenCloseTkt[0];
        this.op=this.tkt.opened;
         this.clos=this.tkt.closed;
         this.tot=this.op+this.clos;
        

      })



      //Pie Chart

this.apollo.watchQuery<any>({
  query:CHART_PIE,
    variables: {
      user_type:localStorage.getItem('user_Type'), 
      user_id:localStorage.getItem('UserId')
  
    },
    pollInterval:40000,
  
  }) .valueChanges
  .subscribe(({ data, loading }) => {
 
   for(let i=0;i<data.totalTktByClient.length;i++){
      
    this.total[i]=data.totalTktByClient[i].total_tkt
    
    this.cli_typ[i]=data.totalTktByClient[i].client_type;
    this.colors4[i]='#'+Math.floor(Math.random()*18777219).toString(16);
    // var o = Math.round, r = Math.random, s = 255;
    // var g= 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + .2 + ')';
    // this.colors4[i]=g;
     }
  

var MyPie = new Chart('pie3', {
  type: 'pie',
  data : {
    labels:this.cli_typ,
    datasets: [{
      data:this.total,
      backgroundColor:this.colors4,
     
    }]
  },
  options: {
    elements:{
       arc:{
         borderWidth:0
       }
    },
    legend:{
      display:false
   },
    responsive:true,
     maintainAspectRatio:true,
    }
})
  })





// For 2nd horizontal bar chart 
this.apollo.watchQuery<any>({
query: localStorage.getItem('user_Type') != 'C' ? SHOW_EMPLOYWW : CLIENT_MONTHLY_TKT,
  variables: {
    user_type:localStorage.getItem('user_Type'), 
    user_id:localStorage.getItem('UserId')

  },
  pollInterval:40000,

}) .valueChanges
.subscribe(({ data, loading }) => {
  // console.log(data);
  if(localStorage.getItem('user_Type') != 'C'){
    for(let i=0;i<data.workDone.length;i++){
    
      this.Done[i]=data.workDone[i].done;
      this.Emp[i]=data.workDone[i].emp_name;
      this.colors2[i]='#'+Math.floor(Math.random()*16777215).toString(16)
      // var o = Math.round, r = Math.random, s = 255;
      // var g= 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + .4+ ')';
      // this.colors2[i]=g;
       }
  }else{
    for(let i=0;i<data.clientMonthlySupport.length;i++){
    
      this.Done[i]=data.clientMonthlySupport[i].no_tkt;
      this.Emp[i]=data.clientMonthlySupport[i].date_name;
      this.colors2[i]='#'+Math.floor(Math.random()*16777215).toString(16)
      // var o = Math.round, r = Math.random, s = 255;
      // var g= 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + .4+ ')';
      // this.colors2[i]=g;
       }
  }
  
  // console.log(this.Done);
  // console.log(this.Emp);


var MyPieChart = new Chart('pie2', {
  type: 'horizontalBar',
  data : {
    labels:this.Emp,
    datasets: [{
      data:this.Done,
      backgroundColor:this.colors2,
      // hoverOffset: 4
    }]
  },
  options: {
    elements:{
       arc:{
         borderWidth:0
       }
    },
    legend:{
      display:false
   },
    responsive:true,
     maintainAspectRatio:false,
    }
})

})




// For 1st horizontal bar Chart
this.apollo.watchQuery<any>({
  query:TKT,
  variables: {
    user_type:localStorage.getItem('user_Type'),
    user_id:localStorage.getItem('UserId')

  },
  pollInterval:40000,

})
  .valueChanges
  .subscribe(({ data, loading }) => {
    // console.log("tkt:" ,data);
     
    for(let i=0;i<data.openTktByStatus.length;i++){
      console.log(data.openTktByStatus[i].tkt_status);
    this.tkt_stat[i]=data.openTktByStatus[i].tkt_status;
    this.stat[i]=data.openTktByStatus[i].status;
    this.colors1[i]= '#'+Math.floor(Math.random()*16777217).toString(16);
    // var o = Math.round, r = Math.random, s = 255;
    // var g= 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + .4+ ')';
    // this.colors1[i]=g;
    // console.log(this.colors1[i])
    }
    // console.log(this.tkt_stat);
   


   var MyChart = new Chart('pie1', {
      type: 'horizontalBar',
     
      data : {
        labels:this.tkt_stat,
        datasets: [{
        
          data:this.stat,
          
          // backgroundColor: [
          //   'rgb(255, 99, 132)',
          //   'rgb(54, 162, 235)',
          //   'rgb(255, 205, 86)'
          // ],
          backgroundColor:this.colors1,
          
          // hoverOffset: 4
        }]
      },
      options: {
        elements:{
       arc:{
         borderWidth:0
       }
    },
        legend:{
           display:false
        },
        responsive:true,
         maintainAspectRatio:false,}
    })
    


  })



//  For Bar Charts in Angular
      this.apollo.watchQuery<any>({
        query:LAST_SEVEN,
        variables: {
          user_type:localStorage.getItem('user_Type'),
          user_id:localStorage.getItem('UserId')
      
        },
        pollInterval:40000,
      
      })
        .valueChanges
        .subscribe(({ data, loading }) => {
          // console.log("Bar Chart");
          // console.log("tkt:" ,data);
           
          for(let i=0;i<data.totalTktByDate.length;i++){
            // console.log(data.totalTktByDate[i].no_tkt);
          this.no_tkt[i]=data.totalTktByDate[i].no_tkt;
          this.date_time[i]=data.totalTktByDate[i].date_name;
          this.colors3[i]= '#'+Math.floor(Math.random()*16777212).toString(16);
          // var o = Math.round, r = Math.random, s = 255;
          // var g= 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + .4+ ')';
          // this.colors3[i]=g;
          }

     var myChart = new Chart('ctx', {
    type: 'bar',
     data: {
        labels: this.date_time,
        datasets: [{
           
            data: this.no_tkt,
            backgroundColor: this.colors3,
            
            borderWidth: 1
        }]
    },

    options: {
      legend:{
        display:false
     },
     responsive:true,
      maintainAspectRatio:false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },

                gridLines: {
                  display: false,

              },

            }],

        }
    }
});
        });




















}

go_to_update(v:any){
  console.log(v);
  this.router.navigate(['/Edit/clientraiseticket',v]);

}


public fetch_data() {
    // For Client Dashboard
    this.apollo.watchQuery<any>({
      query:GET_CLIENT_TICKITES_DETAILS,
      variables:{
        client_id:localStorage.getItem('UserId')
      },
      pollInterval:40000

    }).valueChanges.subscribe(({data})=>{
      console.log(data);
      this.details_tickite=data.clientGetTktDashboard;

      this.put_data(this.details_tickite);


    })

}
//   this.apollo.watchQuery<any>({
//     query:GET_DATA_A,
//     variables: {
//       tag: '1'
//     },
//     pollInterval:500
//   })
//     .valueChanges
//     .subscribe(({ data, loading }) => {
//       console.log(data);

//       this.user_data = data;

//       this.dataSource.sort = this.sort;
//       this.putdata(this.user_data);

//     })



// }
// public putdata(v:any){
//   this.dataSource = new MatTableDataSource(v.getUserDetailsA);

// }


// fetch_data1() {


//   this.apollo.watchQuery<any>({
//     query:TKT,
//     variables: {
//       user_type:localStorage.getItem('user_Type'),
//       user_id:localStorage.getItem('UserId')

//     },
//     pollInterval:500,

//   })
//     .valueChanges
//     .subscribe(({ data, loading }) => {
//       console.log("tkt:" ,data);
//       this.t=data;

//       this.putdata1(this.t);


//     })





// }

// public putdata1(v1:any){
//   this.dataSource1 = new MatTableDataSource(v1.openTktByStatus);
//   this.dataSource1.paginator = this.paginator;
// }



ngAfterViewInit() {
  this.dataSource.sort = this.sort;
  this.dataSource1.paginator = this.paginator;

}

public put_data(v:any){
  this.dataSource2=new MatTableDataSource(v);
}



go_to_page(){

  if(localStorage.getItem('user_Type')=='T'){
    this.router.navigate(['/operations/raiseticket']);
  }
  else{
    if(localStorage.getItem('user_Type')=='W'){
      this.router.navigate(['/operations/attendanddeliver',1]);
    }
    else{
      this.router.navigate(['/operations/attendanddeliver',0]);

    }
  }



}
showprofile(){
  this.show_profile=false;

}

get_emp_details(v:any,v1:any)
{
  this.apollo.watchQuery<any>({
    query: GET_PROFILE,
    variables:{
      user_email:v.toString(),
      user_type:'E'
    },
    // pollInterval:60000
    fetchPolicy:'network-only'
  }).valueChanges
  .subscribe(({ data}) => {
    // console.log(data);
    this.pn=data.getProfileDtls[0].phone_no;
    this.EMP_NAME=v1;
     this.Email=v;
     this.i=data.getProfileDtls[0].image?this.uri+data.getProfileDtls[0].image:'/assets/profile.png';})
}


go_to_view(){
  this.router.navigate(['/Edit/clientraiseticket',this.Tkt_no]).then(()=>{
    location.reload();
  })
}




}

