import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { commonEditor } from 'src/app/utilitY/commonEditor';
declare var $:any;
const SHOW_CLIENT=gql`
query getClient($active: String){
  getClient(id:"", active: $active){
    id
    client_name
    client_type
    phone_no
    district_name
  }
}`
;


// For showing module master
const SHOW_MM=gql`
query{
  getModuleTypeData(id:"", db_type: 5){
    module_id
    module_type
  }
}`

// For showing priority module
const SHOW_PM=gql`
query{
  getPriorityModeData(id:"", db_type: 4){
    priority_id
    priority_mode
  }
}`


// For Filling  the readonly field  by using client type
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
    priority_status
    tkt_module
  }
}`
;


// For update data
const EDITABLE=gql`
mutation updateRaiseTkt($id:String!,$tkt_module: String!,
  $phone_no:String!,$priority_status:String!
  ,$prob_reported:String!,$remarks:String!,$user_id:String!) {

    updateRaiseTkt(id:$id
      tkt_module: $tkt_module
      phone_no:  $phone_no
      priority_status:$priority_status
      prob_reported:$prob_reported
      remarks: $remarks
      user_id: $user_id)  {

       success
       message

}
}`
;



@Component({
  selector: 'app-edittkt',
  templateUrl: './edittkt.component.html',
  styleUrls: ['./edittkt.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css'
 ]
})
export class EdittktComponent implements OnInit {
  configEditor= commonEditor.config;
  remarks:any

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

  logDate:any;
  valid_init=false;
  mm_val=true;
  prior_val=true;
  issue_val=true;
  phone_val=true;
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
  constructor(private apollo:Apollo,private route:ActivatedRoute,private router:Router) {
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  ngOnInit(): void {
    this.pathname=window.location.href.split('#').pop();
    console.log("path:" +window.location.href.split('#').pop())
    console.log("pathname:" +decodeURIComponent(this.pathname));
    localStorage.setItem('address', decodeURIComponent(this.pathname));
    localStorage.setItem('editraisetickit','0');

    this.input_phone=document.getElementById('itemphone');
    this.input_issue=document.getElementById('itemissue');
    this.apollo.watchQuery<any>({
      query: SHOW_CLIENT,
      //pollInterval:100,
      variables:{
        active:'1'
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {

        this.posts = data;
       console.log(data)
       this.ctmdata=this.posts.getClient;
        console.log(this.posts);
      // this.putdata(this.posts);
      });
      this.apollo.watchQuery<any>({
      query: SHOW_MM

    })
      .valueChanges
      .subscribe(({ data }) => {
        //this.loading = loading;
        this.mod= data;
        console.log(data);
        this.moddata=this.mod.getModuleTypeData
     console.log(this.mod);


       //this.putdata(this.posts);
      });
     this.apollo.watchQuery<any>({
        query: SHOW_PM,

      })
        .valueChanges
        .subscribe(({ data, loading }) => {

          this.posts_pm = data;
          this.pmdata=this.posts_pm.getPriorityModeData
          console.log(this.posts_pm);
          console.log(this.pmdata);
        //  this.putdata(this.posts_pm);
        });

        this.route.params.forEach((params: any) => {
          this.id = params['id'];
          })
          this.apollo.watchQuery<any>({
            query: GET_EDITABLE,
            variables:{
               id:this.id,
               user_type:localStorage.getItem('user_Type'),
               user_id:localStorage.getItem('UserId')
            },
             pollInterval:500


          })
            .valueChanges
            .subscribe(({ data}) => {

              console.log(data);

              this.assign_to=data.getSupportLogDtls[0].emp_name;
              this.tktstatus=data.getSupportLogDtls[0].tktStatus;
              this.attendedat=data.getSupportLogDtls[0].call_attend;
              this.deliveryat=data.getSupportLogDtls[0].delivery;
              this.work_status=data.getSupportLogDtls[0].work_status > 0 ? 'Done' : 'Pending';

              this.client_name=data.getSupportLogDtls[0].client_name;
               this.district_name=data.getSupportLogDtls[0].district_name;
              this.client_type=data.getSupportLogDtls[0].client_type;
              this.oprn_mode=data.getSupportLogDtls[0].oprn_mode;
              this.working_hrs=data.getSupportLogDtls[0].working_hrs;
              this.amc_upto=data.getSupportLogDtls[0].amc_upto;
              this.rental_upto=data.getSupportLogDtls[0].rental_upto;
              this.phone_no=data.getSupportLogDtls[0].phone_no;
              this.priority_status=data.getSupportLogDtls[0].priority_status;
              this.tkt_module=data.getSupportLogDtls[0].tkt_module;
              this.prob_reported=data.getSupportLogDtls[0].prob_reported;
              this.remarks=data.getSupportLogDtls[0].remarks;
              this.logDate=data.getSupportLogDtls[0].log_in;
              console.log(this.priority_status);
              console.log("Module:" +this.tkt_module)
              if(this.tkt_module==''){
                this.valid_init=true;
              }
              else{
                this.valid_init=false;
              }



                  for(let i=0;i<this.posts_pm.getPriorityModeData.length;i++){
                    console.log("status:" +this.priority_status);
                    console.log("status:" +this.posts_pm.getPriorityModeData[i].priority_id)
                        if(this.posts_pm.getPriorityModeData[i].priority_id== this.priority_status){
                          this.Priority=this.posts_pm.getPriorityModeData[i].priority_mode;
                          this.prio=this.posts_pm.getPriorityModeData[i].priority_id;

                        }
                  }

                  for(let i=0;i<this.mod.getModuleTypeData.length;i++){
                    console.log("Module:" +this.tkt_module);
                    console.log("Module:" +this.mod.getModuleTypeData[i].module_id)
                        if(this.mod.getModuleTypeData[i].module_id== this.tkt_module){
                          this.modul=this.mod.getModuleTypeData[i].module_id;
                          this.Module=this.mod.getModuleTypeData[i].module_type;

                        }
                  }

                 console.log(this.assign_to);
                 $(".select2").select2("val", this.modul);

             })


}






  select_mm(v:any){
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

  }
  clearfield(){this.spinshow=true;
    setTimeout(()=>{this.spinshow=false;;},1000);
    // this.spinshow=false;


  }
  go_to_dashboard(v1:any,v2:any,v3:any,v4:any,v5:any,v6:any,v7:any,v8:any,v9:any,v10:any,v11:any,v12:any){

    //   console.log("Date:" +v1);
    // console.log("Client:" +v2);
    // console.log("District:" +v3);
    // console.log("Clienttype:" +v4);
    // console.log("operationalmode:" +v5);
    // console.log("workinghours:" +v6);
    // console.log("amcupto:" +v7);
    // console.log("rentalupto:" +v8);
    // console.log("phone:" +v9);
    // console.log("priority:" +v10);
    // console.log("Module:" +v11);
    // console.log("issue:" +v12);
    // console.log("remarks:" +this.remarks);

    this.apollo.mutate({
      mutation: EDITABLE,
      variables:{
        id:this.id,
        tkt_module:v11,
        phone_no:v9,
        priority_status:v10,
        prob_reported:v12,
        remarks:this.remarks ? this.remarks : '',
        user_id: localStorage.getItem("UserId")

      }
    }).subscribe(({data})=>{
      console.log(data);
      this.edit=data;
      if(this.edit.updateRaiseTkt.success==1){
        localStorage.setItem('editraisetickit','1');
        this.router.navigate(['/operations/raiseticket']).then(() => {
          window.location.reload()
        });
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

}
