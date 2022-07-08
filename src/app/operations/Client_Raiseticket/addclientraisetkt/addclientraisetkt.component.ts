import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { ToastrManager } from 'ng6-toastr-notifications';

const GET_POST_DATA_USING_CLIENTTYPE=gql`

 query getClient($id:String!,$active:String!){
    getClient(id:$id, active:$active){
     district_name
     client_type
     oprn_mode
      working_hrs
    amc_upto
    rental_upto
    phone_no,
    client_name,

  }
}`
;


const SHOW_MM=gql`
query{
  getModuleTypeData(id:"", db_type: 5){
    module_id
    module_type
  }
}`
;

const FOR_GET=gql`

mutation  clientTktSave( 
  $client_id: String!,
  $tkt_module: String!,
  $phone_no: String!,
  $priority_status: String!,
  $prob_reported: String!,
  $email: String!,
  $user_id: String!
  $name: String!
  
){
  clientTktSave(client_id:$client_id,tkt_module:$tkt_module,phone_no:$phone_no,priority_status: $priority_status,prob_reported: $prob_reported,
email:$email,user_id:$user_id,name : $name){
success
message
  }
}
`;

const img_upload=gql`
mutation clientTktUpload($user_id: String!, $image: Upload!, $id:String!){
  clientTktUpload(user_id: $user_id, image: $image, id: $id){
    message
    success
  }
}`;

@Component({
  selector: 'app-addclientraisetkt',
  templateUrl: './addclientraisetkt.component.html',
  styleUrls: ['./addclientraisetkt.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class AddclientraisetktComponent implements OnInit {
  @ViewChild('files',{static:true}) files!:ElementRef 
  _file_msg:any=''
  public now: Date = new Date();
  district_name:any;
  client_type:any;
  oprn_mode_id:any;
  working_hrs:any;
  amc_upto:any;
  rental_upto:any;
  phone_no:any;
  v:any;
  posts_pm:any;
  pmdata:any;
  posts:any;
  mod:any;
  moddata:any;
  client_name:any;
  res:any;
  file:any;




  keyword:any;
  user:any;

  ctmdata:any;
  prevent_init_client=false;
  prevent_init_module=false;
  prevent_init_priority=false;
  prevent_init_issue=false;
  prevent_init_phone=false;
  prevent_init_remarks=false;
  cl_val=true;
  mm_val=true;
  prior_val=true;
  issue_val=true;
  phone_val=true;
  remarks_val=true;
  input_phone:any;
  input_remarks:any;
  input_issue:any;
  success:any;
  successmsg:any;
  x:any;
  dropdown:any=[];
  cl_id:any;
  cl_name:any;
  sel:any;
  spinshow:boolean=true;
  constructor(private apollo:Apollo,private router:Router,private toastr:ToastrManager) {
    setInterval(() => {
      this.now = new Date();
    }, 1);
   }

  ngOnInit(): void {
    localStorage.setItem('address','/Add/clientraisetkt')
    this.input_phone=document.getElementById('itemphone');

    this.input_issue=document.getElementById('itemissue');
    this.input_remarks=document.getElementById('itemremarks')


    this.v=localStorage.getItem('UserId')
    this.apollo.watchQuery<any>({
      query: GET_POST_DATA_USING_CLIENTTYPE,
      // pollInterval:100,
      variables:{
        id:this.v,
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
         this.phone_no=data.getClient[0].phone_no;
         this.client_name=data.getClient[0].client_name;

        })
         this.apollo.watchQuery<any>({
          query: SHOW_MM

        })
          .valueChanges
          .subscribe(({ data }) => {

            this.mod= data;
            console.log(data);
            this.moddata=this.mod.getModuleTypeData
            });



  }



  preventNonNumericalInput(e:any){
    e = e || window.event;

    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[0-9]+$/))
     { e.preventDefault();}

  }
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

      }
      else

       {
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



  }
  select_mm(e:any){

    if(e=='')
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

  // submit(v1:any,v2:any,v3:any,v4:any,v5:any,v6:any,v7:any,v8:any,v9:any,v10:any,v11:any,v12:any,v13:any){
    submit(v1:any,v2:any,v3:any,v4:any,v9:any,v10:any,v11:any,v12:any,_email:any,_name:any){
    
  console.log({"email" : _email,"Image":this.file});
          this.apollo.mutate({
            mutation:FOR_GET,
            variables:{
              client_id:localStorage.getItem('UserId'),
              tkt_module:v11,
              phone_no: v9,
              priority_status:v10,
              prob_reported: v12,
              email:_email,
              user_id:localStorage.getItem('UserId'),
              name:_name
            }
          }).subscribe(({data})=>{
          


            console.log(data);
              
            this.res=data;
            var dt= JSON.parse(this.res.clientTktSave.message);
            console.log(dt.insertId);
            
                
            if(this.res.clientTktSave.success=="1"){
              if(this.file != ''){
                console.log("file exist");
                
                this.apollo
                .mutate({
                    mutation: img_upload,
                    variables:{
                      user_id:localStorage.getItem('user_email'),
                      image: this.file,
                      id: dt.insertId.toString()
                    },
                    context: {
                      useMultipart: true
                    }
                  })
                  .subscribe(({ data}) => {         
                  })
              }
              localStorage.setItem('client_raiseticket','1');
              this.router.navigate(['/Clientraisetkt']).then(() => {
           window.location.reload()});
             

              
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
           selectFile(event:any){
            this._file_msg = '';
            if(event.target.files.length > 0){
              if((event.target.files[0].size /1024/1024) > 8){
                  console.log("File Size greater than 8MB");
                  this._file_msg = "File size must not greater than 8MB";
                  this.file = '';

              }
              else{
                if(event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/jpg' || event.target.files[0].type == 'image/png' || event.target.files[0].type == 'application/pdf')
                  {
                    this.file = event.target.files[0];
                  }
                else{
                  this._file_msg = "Invalid File Type";
                  this.file = '';
                  console.log(this.file);
                }
            }  
            }
            else{
                  this.file = '';
            }      
            console.log(this.file);
              
          }


}
