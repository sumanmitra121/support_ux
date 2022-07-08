import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { Subscription } from 'rxjs';
import {formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { ToastrManager } from 'ng6-toastr-notifications';
import { global } from 'src/app/global';
import { commonEditor } from 'src/app/utilitY/commonEditor';

declare var $: any;
// For update Deliver&Attendent Tickite

const EDITABLE=gql`
mutation updateDeliverTkt($id:String!,$call_attend: String!,$delivery:String!,
 $tkt_status:String!,$remarks:String!,$user_id:String!,$work_status:String!,$prob_reported:String!) {

  updateDeliverTkt(id:$id
      call_attend:$call_attend
      delivery:$delivery
      tkt_status:$tkt_status
      remarks:$remarks
      user_id:$user_id,
      work_status:$work_status,
      prob_reported:$prob_reported)  {

       success
       message

}
}`
;

const SHOW_TS=gql`
query{
  getTktStatusData(id:"", db_type: 3){
    tkt_id
    tkt_status
  }
}`



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
    work_status,
    call_attend,
    delivery,
    work_status,
    file_path

  }
}`
@Component({
  selector: 'app-editadandd',
  templateUrl: './editadandd.component.html',
  styleUrls: ['./editadandd.component.css',
  '../../../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../../../assets/masters_css_js/css/apps.css',
  '../../../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../../../assets/masters_css_js/css/res.css']
})
export class EditadanddComponent implements OnInit {
  configEditor= commonEditor.config;

  _uploaded_type:any
  _uploaded_img:any;
  id:any;
  tkt_no:any
  TktStatus:any;
  logDate:any;
  tktid:any;
  client_name:any
   district_name:any
  client_type:any;
  oprn_mode:any;
  working_hrs:any;
  amc_upto:any;
  rental_upto:any;
  phone_no:any;
  priority_status:any;
  tkt_module:any;
  prob_reported:any;
  assign_engg:any;
  tickit:any;
  mes:any;
  tkt:boolean=false;
  phonmobile:boolean=false;
  mobile:boolean=false;
  Attend:any;
  pathname:any;
  posts_ts:any;
  tsdata:any;
  deliver:any;
   w_stats:any;
  attended:any;
  dateitem:any;
  valid_init=false;
  valid_init_at=false;
  valid_init_de=false;
  input_attended:any;
  input_delivery:any;
  Remarks:any;
  today:any;
  x:any;
  attend:any;
   input:any;
   c:any;
   d:any;
   w:any;
  // delive:boolean=true;
  for_issue_error:boolean=false;
  valid_issue:boolean=true;
  deliv:any;
  // valid_init_work:boolean=true;
  issue:any;
  work:any;
  wrork_stat:boolean=false;
  constructor(public datepipe: DatePipe,private apollo:Apollo,private route:ActivatedRoute,private router:Router,public toastr: ToastrManager) {}
  ngOnInit(): void {

   this.issue=document.getElementById("itemissue");
   console.log("empty:" +this.issue.value)


    this.work=document.getElementById("wrkstatus")
    localStorage.setItem('Active', '1');
    this.input_delivery=document.getElementById('itemdeliveryat')
    this.input_attended=document.getElementById('itemattendedat')
    this.w_stats=document.getElementById('wrkstatus');
    if(this.w_stats.value==''){
      console.log("d")
      this.valid_init=true;
    }
    // var iso = new Date().toISOString();
    // var minDate = iso.substring(0,iso.length-1);


    // this.input_attended.min=minDate;
    // this.input_delivery.min=minDate;



    localStorage.setItem('attendent','0');

    this.pathname=window.location.href.split('#').pop();
    console.log("path:" +window.location.href.split('#').pop())
    console.log("pathname:" +decodeURIComponent(this.pathname));
    localStorage.setItem('address', decodeURIComponent(this.pathname));



    this.dateitem=document.getElementById('itemdate');


    this.apollo.watchQuery<any>({
      query: SHOW_TS,
      //pollInterval:100
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        // this.loading = loading;
        this.posts_ts = data;
       this.tsdata=this.posts_ts.getTktStatusData;
        console.log(this.posts_ts);
       //this.putdata(this.posts_ts);
      });


      this.route.params.forEach((params: any) => {
        this.id = params['id1'];
        console.log(this.id )
        this.apollo.watchQuery<any>({
          query: GET_EDITABLE,
          variables:{
             id: this.id,
              user_type:localStorage.getItem('user_Type'),
              user_id:localStorage.getItem('UserId')

          },
          pollInterval:500

        })
          .valueChanges
          .subscribe(({ data}) => {

            console.log(data);

            this.tkt_no=data.getSupportLogDtls[0].tkt_no;
            this.client_name=data.getSupportLogDtls[0].client_name;
             this.district_name=data.getSupportLogDtls[0].district_name;
            this.client_type=data.getSupportLogDtls[0].client_type;
            this.oprn_mode=data.getSupportLogDtls[0].oprn_mode;
            this.working_hrs=data.getSupportLogDtls[0].working_hrs;
            this.amc_upto=data.getSupportLogDtls[0].amc_upto;
            this.rental_upto=data.getSupportLogDtls[0].rental_upto;
            this.phone_no=data.getSupportLogDtls[0].phone_no;
            this.priority_status=data.getSupportLogDtls[0].priority;
            this.tkt_module=data.getSupportLogDtls[0].module;
            this.prob_reported=data.getSupportLogDtls[0].prob_reported;
          console.log(this.prob_reported);

            this.assign_engg=data.getSupportLogDtls[0].emp_name;
            this.Remarks=data.getSupportLogDtls[0].remarks;
            this.TktStatus=data.getSupportLogDtls[0].tktStatus;
            this.tktid=data.getSupportLogDtls[0].tkt_status;
            // this.valid_init= this.tktid!='' ? false:true;
            console.log(this.valid_init)
            this.logDate=data.getSupportLogDtls[0].log_in;
            this.c=data.getSupportLogDtls[0].call_attend;
            this.d=data.getSupportLogDtls[0].delivery;
            this.w=data.getSupportLogDtls[0].work_status > 0 ? data.getSupportLogDtls[0].work_status : '';
            this._uploaded_img = global.raw_url+data.getSupportLogDtls[0].file_path;
            this._uploaded_type = data.getSupportLogDtls[0].file_path ? ( data.getSupportLogDtls[0].file_path.substring(data.getSupportLogDtls[0].file_path.length -3) == 'pdf' ? 1 : 2) : 0;
            console.log(this.w,this.d,this.c)
            this.c =this.datepipe.transform(this.c, 'medium');
            this.d=this.datepipe.transform(this.d, 'medium');


            console.log( this.tkt_no)
           console.log(this.client_name);
           console.log( this.district_name);
           console.log(this.client_type);
           console.log(this.oprn_mode);
           console.log(this.c,this.d,this.w)

           if(this.c==''){
             console.log("c")
            this.valid_init_at=true;
           }

          if(this.d==''){
            console.log("d")
           this.valid_init_de=true;
          }

          // if(this.w==''){
          //   console.log("d")
          //  this.valid_init=true;
          // }




          
           if(this.prob_reported==''){
                        this.for_issue_error=true;
                        this.valid_issue=true;
           }
           else{
                this.for_issue_error=false;
                this.valid_issue=false;
           }

           $('.select2').select2("val",this.tktid);


          })

      })
      console.log(this.valid_issue)

      $('.tkt_status').select2({}).on('select2:select',(e:any)=>{
         this.tkt_select(e.params.data.id);      
        })

 }


 setcalender(){
 console.log(this.input_attended.value)
 if(this.input_attended.value==''){
  this.input_delivery=document.getElementById('itemdeliveryat')
  var iso = new Date().toISOString();
  var minDate = iso.substring(0,iso.length-1);
  this.input_delivery.min=minDate;
}
else{
  this.input_delivery=document.getElementById('itemdeliveryat')
  this.input_delivery.min=this.input_attended.value;
}
 }



  preventNonNumericalInput(e:any){}

  go_to_dashboard(v1:any,v2:any,v3:any,v4:any,v5:any,v6:any,v7:any,v8:any,v9:any,v10:any,v11:any,v12:any,v13:any,v14:any,v15:any,v16:any,v17:any,v19:any){
    // console.log("Date:" +v1);
    // console.log("Tickitno:" +v2);
    // console.log("Client:" +v3);
    // console.log("District:" +v4);
    // console.log("Clienttype:" +v5);
    // console.log("operationalmode:" +v6);
    // console.log("workinghours:" +v7);
    // console.log("amcupto:" +v8);
    // console.log("rentalupto:" +v9);
    // console.log("phone:" +v10);
    // console.log("prioritystatus:" +v11);
    // console.log("module:" +v12);
    console.log("issue:" +v13);
    // console.log("assignedto:" +v14);
    console.log("Attendantat:" +v15);
    console.log("Delivaryat:" +v16);
    console.log("tickitstatus:" +v17);
    // console.log("remarks:" +v18);
    console.log("workingstatus:" +v19);
    // console.log(this.datepipe.transform( v16, 'yyyy-mm-dd hh:mm:sss'))
    console.log(this.id);
    // if(v15<v16){
    //   console.log("Its Ok");
    // }
    // else{
    //   console.log("not Ok");
    // }

    this.apollo.mutate({
      mutation: EDITABLE,
      variables:{
        id:this.id,
        call_attend:this.datepipe.transform( v15, 'yyyy-MM-dd HH:mm:ss'),
        delivery: v16 != '' ? this.datepipe.transform( v16, 'yyyy-MM-dd HH:mm:ss') : '',
        tkt_status:v17,
        remarks:this.Remarks ? this.Remarks : '',
        user_id:localStorage.getItem("UserId"),
        work_status:v19,
        prob_reported:v13

      }
    }).subscribe(({data})=>{
      console.log(data);
      this.Attend=data;
      if( this.Attend.updateDeliverTkt.success==1){
        localStorage.setItem('attendent','1');
        this.router.navigate(['/operations/attendanddeliver',0]).then(() => {
          window.location.reload()
        });
      }
      else if(this.Attend.updateDeliverTkt.success==2){
            this.mes=this.Attend.updateDeliverTkt.message;
            console.log("message:",this.mes);
            this.toastr.errorToastr(this.mes, 'Error!',{
              position: 'top-center',
              toastTimeout: (5000)
          });
      }

      else
      this.showsnackbar();
      },error=>{ this.showsnackbar()
      });


  }
  showsnackbar() {

     this.x = document.getElementById("snackbar");
     this.x.className = "show";
     setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
   }
   wrk_select(v:any){
     console.log(v);

    if(v==''){
      this.wrork_stat=true;
      // this.valid_init_work=true;
      this.valid_init=true;
      this.work.style.border="solid red 1px";
    }
    else{
      this.work.style.border="solid lightgrey 1px";
      this.wrork_stat=false;
      // this.valid_init_work=false;
      this.valid_init=false;
    }
    if(v=='1'){
      this.d=Date.now();
      this.d = this.datepipe.transform( this.d, 'medium');
      // this.d==this.datepipe.transform(this.d, 'dd');

    }
    else{
      this.d='';
    }
    console.log(this.d);
   }


  prevent_null(e:any){


     console.log(e.target.value);
    if(e.target.id=="itemattendedat")
    {
      if(e.target.value=='')
      {
        this.valid_init_at=true;
       
         this.mobile=true;
        this.input_attended.style.border="solid red 1px"
       
      }
      else

       {
      
       this.mobile=false;
         this.valid_init_at=false;
       this.input_attended.style.border="solid lightgrey 1px"}

    }
    if(e.target.id=='itemdeliveryat')
    {
      if(e.target.value=='')
      {
        this.valid_init_de=true;
    
       this.phonmobile=true;
        this.input_delivery.style.border="solid red 1px"
        console.log("phone")
      
      }
      else

       {
        this.input=e.target.valuel
        console.log(e.target.value)
       this.phonmobile=false;
         this.valid_init_de=false;
       this.input_delivery.style.border="solid lightgrey 1px"}

    }

  }
  tkt_select(v:any){
    this.tickit=document.getElementById("tktstatus")
    if(v==''){
      this.tkt=true;
      this.valid_init=true;
       this.tickit.style.border="solid red 1px";
    }
    else{
      this.tickit.style.border="solid lightgrey 1px";
      this.tkt=false;
      this.valid_init=false;
    }
   
  }
  prevent_null_issue(e:any){
        if(e.target.value==''){
             this.issue.style.border="solid red 1px";
            this.for_issue_error=true;
            this.valid_issue=true;
          }
        else{
          this.issue.style.border="solid lightgrey 1px";
            this.for_issue_error=false;
            this.valid_issue=false;
          }
  }

}
