import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Router} from '@angular/router';
import { DatePipe } from '@angular/common'
import { commonEditor } from 'src/app/utilitY/commonEditor';

declare const $: any;
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

  const SHOW_MM=gql`
  query{
    getModuleTypeData(id:"", db_type: 5){
      module_id
      module_type
    }
  }`
  const SHOW_PM=gql`
  query{
    getPriorityModeData(id:"", db_type: 4){
      priority_id
      priority_mode
    }
  }`


// For adding Raise tickit in api

const GET_POST_update = gql`
mutation createTkt($client_id:String!,$tkt_module:String!,$phone_no:String!,$priority_status:String!,
                    $prob_reported:String!,$remarks:String!,$user_id:String!) {
  createTkt(client_id: $client_id, tkt_module: $tkt_module, phone_no: $phone_no, priority_status: $priority_status ,
            prob_reported:$prob_reported,remarks:$remarks,user_id:$user_id ) {

    success
    message
  }
}`
;


// For Filling  the readonly field  by using client type
 const GET_POST_DATA_USING_CLIENTTYPE=gql`

 query getClient($id:String!,$active:String!){
    getClient(id:$id, active:$active){
     district_name
     client_type
     oprn_mode
      working_hrs
    amc_upto
    rental_upto
    phone_no

  }
}`
;



@Component({
  selector: 'app-addrt',
  templateUrl: './addrt.component.html',
  styleUrls: ['./addrt.component.css',
  '../../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../../assets/masters_css_js/css/apps.css',
  '../../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../../assets/masters_css_js/css/res.css']
})
export class AddrtComponent implements OnInit {
  configEditor= commonEditor.config;
  remarks:any
  // idfield:any=[{item_id:'',item_name:''}];
  transform:any;
  // spinshow:boolean=true;
  amc_date_ex:boolean=true;
  constructor(private apollo:Apollo,private route:Router,public datepipe: DatePipe) {
    setInterval(() => {
      this.now = new Date();
    }, 1);
   }
   keyword:any;
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
  cl_val=true;
  mm_val=true;
  prior_val=true;
  issue_val=true;
  phone_val=true;
  input_phone:any;
  input_issue:any;
  spinshow=false;
  district_name:any;
  client_type:any;
  oprn_mode_id:any;
  working_hrs:any;
  amc_upto:any;
  rental_upto:any;
  phone_no:any;
  public now: Date = new Date();
  success:any;
  successmsg:any;
  x:any;
  dropdown:any=[];
  cl_id:any;
  cl_name:any;
  sel:any;
  rental_date_ex:boolean=true;

  ngOnInit(): void {
    localStorage.setItem('Active', '1');
    localStorage.setItem('insertickit','0');

    this.input_phone=document.getElementById('itemphone');

    this.input_issue=document.getElementById('itemissue');

    localStorage.setItem('address','/operations/addraiseticket');
    this.apollo.watchQuery<any>({
      query: SHOW_MM

    })
      .valueChanges
      .subscribe(({ data }) => {
        //this.loading = loading;
        this.mod= data;
        console.log(data);
        this.moddata=this.mod.getModuleTypeData
        // console.log(this.ctmdata);


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
        //  this.putdata(this.posts_pm);
        });

        this.apollo.watchQuery<any>({
          query: SHOW_CLIENT,
          variables:{
            active:'1'
          }
        })
          .valueChanges
          .subscribe(({ data, loading }) => {

            this.posts = data;
           console.log(data)
           this.ctmdata=this.posts.getClient;

           });

           $('.client').select2({})
           .on("select2:select",  (e:any) => {
             this.select_client(e.params.data.id);
         });
         $('.module').select2({})
         .on('select2:select', (e:any)=>{
           this.select_mm(e.params.data.id)

         })


  }






  public select_client(v:any){
    console.log("value:" +v);
    if(v=='')
    {
      this.cl_val=true;
      this.prevent_init_client=true;
    }
    else
    {
      this.cl_val=false;
      this.prevent_init_client=false;
      console.log("id:" +v);
      this.apollo.watchQuery<any>({
        query: GET_POST_DATA_USING_CLIENTTYPE,
        // pollInterval:100,
        variables:{
          id:v,
          active:''
        }
      }).valueChanges
      .subscribe(({ data, loading }) => {
        console.log(data);


           this.district_name=data.getClient[0].district_name;
           this.client_type=data.getClient[0].client_type;
           this.oprn_mode_id=data.getClient[0].oprn_mode;
           this.working_hrs=data.getClient[0].working_hrs;
           this.amc_upto=data.getClient[0].amc_upto;
           this.rental_upto=data.getClient[0].rental_upto;
          var myDate=new Date();
           this.transform=this.datepipe.transform(myDate, 'yyyy-MM-dd');
           this.rental_upto =this.datepipe.transform(this.rental_upto, 'yyyy-MM-dd');
           this.amc_upto =this.datepipe.transform(this.amc_upto, 'yyyy-MM-dd');
           console.log(this.rental_upto,"Date"+this.transform);
           
           if(this.rental_upto<this.transform){
             this.rental_date_ex=false;
             
           }
           else{
            this.rental_date_ex=true;

           }
           this.amc_date_ex=this.amc_upto<this.transform?false:true;
           this.phone_no=data.getClient[0].phone_no;
               

          })

            if(this.phone_no==''){
              this.phone_val=true;
            }
            else{
              this.phone_val=false;
            }
    }
  }
  select_mm(v:any){
    console.log(v);
    
    if(v=='')
    {
      this.mm_val=true;
      this.prevent_init_module=true;
    }
    else
    {
      this.mm_val=false;
      this.prevent_init_module=false;
    }
  }
  select_priority(v:any){
    console.log(v);
    if(v=='')
    {
      this.prior_val=true;
      this.prevent_init_priority=true;
    }
    else
    {
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
        this.phone_val=true;
        this.prevent_init_phone=true;
        this.input_phone.style.border="solid red 1px"
        //this.hide_val=true;
      }
      else

       {
        this.prevent_init_phone=false;this.phone_val=false;this.input_phone.style.border="solid lightgrey 1px"}

    }
    if(e.target.id=='itemissue')
    {
      if(e.target.value=='')
      {
        this.issue_val=true;
        this.prevent_init_issue=true;
        this.input_issue.style.border="solid red 1px"
        console.log("phone")
        //this.hide_val=true;
      }
      else

       {
        this.prevent_init_issue=false;this.issue_val=false;this.input_issue.style.border="solid lightgrey 1px"}

    }

  }
  clearfield(){
    this.spinshow=true;
    setTimeout(()=>{this.spinshow=false;;},1000);
    location.reload();

    // this.spinshow=false;


  }

  go_to_dashboard(v1:any,v2:any,v3:any,v4:any,v5:any,v6:any,v7:any,v8:any,v9:any,v10:any,v11:any,v12:any){
    // console.log("Date:" +this.cl_id);
    console.log("Date:" +v1);
    console.log("Client:" +v2);
    // console.log("District:" +v3);
    // console.log("Clienttype:" +v4);
    // console.log("operationalmode:" +v5);
    // console.log("workinghours:" +v6);
    // console.log("amcupto:" +v7);
    // console.log("rentalupto:" +v8);
    // console.log("phone:" +v9);
    // console.log("priority:" +v10);
    // console.log("module:" +v11);
    // console.log("issue:" +v12);
    // console.log("remarks:" +v13);
    this.user=localStorage.getItem("UserId")
    console.log(this.remarks);
    

    this.apollo.mutate({
      mutation: GET_POST_update,
      variables:{
         client_id:v2,
         tkt_module:v11,
         phone_no: v9,
         priority_status:v10,
        prob_reported: v12,
        remarks:this.remarks ? this.remarks : '',
        user_id:this.user

      }
    }).subscribe(({data})=>{
      console.log(data);
     this.success=data
     console.log("success:" +this.success.createTkt.success);
     if(this.success.createTkt.success==1){
      localStorage.setItem('insertickit','1');

          this.successmsg=this.success.createTkt.message;
          this.route.navigate(['/operations/raiseticket']).then(() => {
            window.location.reload()
          })
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
