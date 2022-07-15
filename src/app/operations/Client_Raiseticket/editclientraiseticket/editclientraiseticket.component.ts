import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { global } from 'src/app/global';
declare const $: any;

const GET_CLIENT_DATA=gql`
query clientGetTkt($id:String!,$client_id:String!) {
  clientGetTkt(id:$id,client_id:$client_id){
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
    priority_status
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
    delivery,
    tkt_module,
    user_name,
    email_id,
    file_path
  }
}`;


const SHOW_MM=gql`
query{
  getModuleTypeData(id:"", db_type: 5){
    module_id
    module_type
  }
}`
;



const EDITABLE=gql`
mutation clientTktUpdate($id:String!,
  $client_id: String!,
  $tkt_module: String!,
  $phone_no: String!,
  $priority_status: String!,
  $prob_reported: String!,
  $email: String!,
  $user_id: String!
  $name: String!) {

    clientTktUpdate(
      id:$id,
      client_id:$client_id,
      tkt_module:$tkt_module,
      phone_no:$phone_no,
      priority_status: $priority_status,
      prob_reported: $prob_reported,
      email:$email,
      user_id:$user_id,
      name : $name)  {

       success
       message

}
}`
;
@Component({
  selector: 'app-editclientraiseticket',
  templateUrl: './editclientraiseticket.component.html',
  styleUrls: ['./editclientraiseticket.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class EditclientraiseticketComponent implements OnInit {
  _uploaded_type:any
  _uploaded_img:any;
  Id:any;
  Name:any
  oprn_mode_id:any
  user:any;
  mod:any;
  moddata:any;
  posts_pm:any;
  pmdata:any;
  posts:any;
  ctmdata:any;
  prevent_init_client=false;
  prevent_init_module=false;
  prevent_init_priority=false;
  prevent_init_issue=false;
  prevent_init_phone=false;
  id:any;
  // cl_val=true;
  assign_to:any;
  tktstatus:any;
  attendedat:any;
  deliveryat:any;
  work_status:any;
  prior:any;
  logDate:any;
  valid_init=false;
  mm_val=false;
  prior_val=true;
  issue_val=false;
  phone_val=false;
  input_phone:any;
  input_issue:any;
  spinshow=false;
  edit:any;
  Remarks:any;
  priority_status:any;
  client_name:any;
  district_name:any;
  client_type:any;
  oprn_mode:any;
  working_hrs:any;
  amc_upto:any;
  rental_upto:any;
  phone_no:any;
  tkt_module:any;
  prob_reported:any;
  public now: Date = new Date();
  success:any;
  successmsg:any;
  prio:any;
  modul:any;
  Module:any;
  x:any;
  Priority:any;
  pathname:any;
  log:any;
  v:any;
  remarks_val=false;
  input_remarks:any;
  res:any;
  ASSIGN_ENG:any;
keyword:any;
  prevent_init_remarks=false;
  cl_val=true;
   dropdown:any=[];
  cl_id:any;
  cl_name:any;
  sel:any;
  issue:any;
  remarks:any;
  email:any;
  constructor(private router:Router,private apollo:Apollo,private route:ActivatedRoute) {

   }

  ngOnInit(): void {
    localStorage.setItem('editclientraisetickit','0');
    this.input_phone=document.getElementById('itemphone');

    this.input_issue=document.getElementById('itemissue');
    this.input_remarks=document.getElementById('itemremarks')
    this.route.params.forEach((params: any) => {
      this.Id = params['id'];
      });
      this.apollo.watchQuery<any>({
        query: SHOW_MM

      })
        .valueChanges
        .subscribe(({ data }) => {

          this.mod= data;
          console.log(data);
          this.moddata=this.mod.getModuleTypeData
          });


      // this.apollo.watchQuery<any>({
      //   query: GET_CLIENT_DATA,
      //   variables:{
      //      id:this.Id,
      //      client_id:localStorage.getItem('UserId')
      //   },
      //   // pollInterval:500
      //   })
      //   .valueChanges
      //   .subscribe(({ data}) => {
      //     console.log(data);
      //     this.email = data.clientGetTkt[0].email_id;
      //     console.log(this.email);
      //     this.Name = data.clientGetTkt[0].user_name;

      //     this.log=data.clientGetTkt[0].log_in;
      //     this.district_name=data.clientGetTkt[0].district_name;
      //     this.client_type=data.clientGetTkt[0].client_type;
      //     this.oprn_mode_id=data.clientGetTkt[0].oprn_mode;
      //     this.working_hrs=data.clientGetTkt[0].working_hrs;
      //     this.amc_upto=data.clientGetTkt[0].amc_upto;
      //     this.rental_upto=data.clientGetTkt[0].rental_upto;
      //     this.phone_no=data.clientGetTkt[0].phone_no;
      //     this.client_name=data.clientGetTkt[0].client_name;
      //      this.prior=data.clientGetTkt[0].priority_status;
      //      this.tkt_module=data.clientGetTkt[0].tkt_module;
      //      console.log(this.tkt_module);
      //      this.prob_reported=data.clientGetTkt[0].prob_reported;
      //      this.Remarks=data.clientGetTkt[0].remarks;
      //      this.ASSIGN_ENG=data.clientGetTkt[0].assign_engg;
      //      console.log(this.tkt_module);
      //      $('select').select2().select2('val',this.tkt_module)
      //      })
      this.getClientDetails();
       }











  select_mm(v:any){
    console.log(v);
    if(v=='')
    {
      this.valid_init=true;
      this.mm_val=true;
      this.prevent_init_module=true;
    }
    else
    {
      this.valid_init=false;
      this.mm_val=false;
      this.prevent_init_module=false;
    }
  }


  select_priority(v:any){
    if(v=='')
    { this.valid_init=true;
      this.prior_val=true;
      this.prevent_init_priority=true;
    }
    else
    { this.valid_init=false;
      this.prior_val=false;
      this.prevent_init_priority=false;
    }
  }
  preventNonNumericalInput(e:any){e = e || window.event;

    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[0-9]+$/))
     { e.preventDefault();}}

   prevent_null(e:any){

    if(e.target.id=='itemphone')
    {
      if(e.target.value=='')
      {
        this.valid_init=true;
        this.phone_val=true;
        this.prevent_init_phone=true;
        this.input_phone.style.border="solid red 1px"
        //this.hide_val=true;
      }
      else

       { this.valid_init=false;
        this.prevent_init_phone=false;this.phone_val=false;this.input_phone.style.border="solid lightgrey 1px"}

    }
    if(e.target.id=='itemissue')
    {
      if(e.target.value=='')
      {
        this.valid_init=true;
        this.issue_val=true;
        this.prevent_init_issue=true;
        this.input_issue.style.border="solid red 1px"
        console.log("phone")
        //this.hide_val=true;
      }
      else

       { this.valid_init=false;
        this.prevent_init_issue=false;this.issue_val=false;this.input_issue.style.border="solid lightgrey 1px"}

    }

    if(e.target.id=='itemremarks'){


      if(e.target.value=='')
      {
        this.remarks_val=true;
        this.prevent_init_remarks=true;
        this.input_remarks.style.border="solid red 1px"
        console.log("phone")
        //this.hide_val=true;
      }
      else

       {
        this.prevent_init_remarks=false;this.remarks_val=false;this.input_remarks.style.border="solid lightgrey 1px"}

  }
  // clearfield(){this.spinshow=true;
  //   setTimeout(()=>{this.spinshow=false;;},1000);
    // this.spinshow=false;


  }


  go_to_dashboard(v1:any,v2:any,v3:any,v4:any,v9:any,v10:any,v11:any,v12:any,_email:any,_name:any){
  //    console.log(this.Id)
  //   console.log("Date:" +v1);
  // console.log("Client:" +v2);
  // console.log("District:" +v3);
  // console.log("Clienttype:" +v4);
  // // console.log("operationalmode:" +v5);
  // // console.log("workinghours:" +v6);
  // // console.log("amcupto:" +v7);
  // // console.log("rentalupto:" +v8);
  // console.log("phone:" +v9);
  // console.log("priority:" +v10);
  // console.log("module:" +v11);
  // console.log("issue:" +v12);
  // // console.log("remarks:" +v13);
  // console.log("Name:"+_name);
  // console.log("Email:"+_email);

  this.apollo.mutate({
    mutation: EDITABLE,
    variables:{
      client_id:localStorage.getItem('UserId'),
      id:this.Id,
      tkt_module:v11,
      phone_no:v9,
      priority_status:v10,
      prob_reported:v12,
      user_id:localStorage.getItem("UserId"),
      email:_email,
      name:_name

    }
  }).subscribe(({data})=>{
    console.log(data);
    this.edit=data;
    if(this.edit.clientTktUpdate.success==1){
      localStorage.setItem('editclientraisetickit','1');
      this.router.navigate(['/Clientraisetkt']);

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

 getClientDetails(){
  this.apollo.watchQuery<any>({
    query: GET_CLIENT_DATA,
    variables:{
       id:this.Id,
       client_id:localStorage.getItem('UserId')
    },
    // pollInterval:500
    })
    .valueChanges
    .subscribe(({ data}) => {
      console.log(data);
      this.email = data.clientGetTkt[0].email_id;
      console.log(this.email);
      this.Name = data.clientGetTkt[0].user_name;

      this.log=data.clientGetTkt[0].log_in;
      this.district_name=data.clientGetTkt[0].district_name;
      this.client_type=data.clientGetTkt[0].client_type;
      this.oprn_mode_id=data.clientGetTkt[0].oprn_mode;
      this.working_hrs=data.clientGetTkt[0].working_hrs;
      this.amc_upto=data.clientGetTkt[0].amc_upto;
      this.rental_upto=data.clientGetTkt[0].rental_upto;
      this.phone_no=data.clientGetTkt[0].phone_no;
      this.client_name=data.clientGetTkt[0].client_name;
       this.prior=data.clientGetTkt[0].priority_status;
       this.tkt_module=data.clientGetTkt[0].tkt_module;
       console.log(this.tkt_module);
       this.prob_reported=data.clientGetTkt[0].prob_reported;
       this.Remarks=data.clientGetTkt[0].remarks;
       this.ASSIGN_ENG=data.clientGetTkt[0].assign_engg;
       this._uploaded_img = global.raw_url+data.clientGetTkt[0].file_path;
       this._uploaded_type = data.clientGetTkt[0].file_path ? ( data.clientGetTkt[0].file_path.substring(data.clientGetTkt[0].file_path.length -3) == 'pdf' ? 1 : 2) : 0; 
       console.log(this.tkt_module);
       $('select').select2().select2('val',this.tkt_module)
       })
 }
}
