import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {Apollo, gql} from 'apollo-angular';
import { DatePipe } from '@angular/common'
const SHOW_CLIENT=gql`
query getClient($id:String,$active:String){
  getClient(id:$id,active:$active){
    id
client_name
district_id
client_type_id
oprn_mode_id
client_addr
tech_person
tech_designation
phone_no
email
working_hrs
support_mode
amc_upto
rental_upto
support_status
remarks
schema_name

  }
}`
const SHOW_DIST=gql`
query{
    getDistrict{
      id
      name
    }
  }`
  const SHOW_CLIENT_TYPE=gql`
  query{
    getClientTypeData(id:"", db_type: 1){
      client_id
      client_type
    }
  }`
const SHOW_OP=gql`
query{
  getOprnModeData(id:"", db_type: 2){
    oprn_id
    oprn_mode
  }
}`;
const SHOW_CLIENT_1=gql`query getClientTypeData($id:String){
  getClientTypeData(id:$id, db_type: 1){
    client_id
    client_type
  }
}`
const SHOW_OP_1=gql`
query getOprnModeData($id:String){
  getOprnModeData(id:$id, db_type: 2){
    oprn_id
    oprn_mode
  }
}`
const SHOW_DIST_1=gql`query{
  getDistrict{
     id
     name
   }
 }`
 const UPDATE_CLIENT=gql`mutation updateClient($id: String!, $client_name: String,
  $district_id: String,
  $client_type_id: String,
  $oprn_mode_id: String,
  $client_addr: String,
  $tech_person: String,
  $tech_designation: String,
  $phone_no: String,
  $email: String,
  $working_hrs: String,
  $support_mode: String,
  $amc_upto: String,
  $rental_upto: String,
  $support_status: String,
  $remarks: String,
  $schema_name: String,
  $user_id: String!){
  updateClient(id:$id, 
  client_name: $client_name,
      district_id: $district_id,
      client_type_id: $client_type_id,
      oprn_mode_id: $oprn_mode_id,
      client_addr: $client_addr,
      tech_person: $tech_person,
      tech_designation: $tech_designation,
      phone_no: $phone_no,
      email: $email,
      working_hrs: $working_hrs,
      support_mode: $support_mode,
      amc_upto: $amc_upto,
      rental_upto: $rental_upto,
      support_status: $support_status,
      remarks: $remarks,schema_name: $schema_name,
  user_id: $user_id){
    success
    message
  }
}`
@Component({
  selector: 'app-component-name',
  templateUrl: './component-name.component.html',
  styleUrls: ['./component-name.component.css', 
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class ComponentNameComponent implements OnInit {
  client_name:any;
  client_addr:any;
  tech_person:any;
  getamc:any;
  getrental:any;
  getactive:any;
  getinactive:any;
  tech_designation:any;
  phone_no:any;
  opid:any;
  mail:any;
  done=false;
  posts1:any;
  ctmdata:any;
  opdata:any;
  remarks1:any;
  working_hrs:any;
  Schema_Name:any;
  radioamc:any;
  radiorental:any;
  radioactive:any;
  radioinactive:any;
  supportstatus:any;
  supportmode:any;
  districts:any;
  x:any;
  distdata:any=[];
  client_data:any;
  clientid:any;
  clidselect:any;
  amcdate:any;
  rentaldate:any;
  amc_rental_Check:boolean=false;
  AMC_RENTAL:any;

  constructor(private datepipe:DatePipe,private router:Router,private apollo:Apollo,private route:ActivatedRoute){ }
  item:any;
  posts:any;
  opselect:any;
  op_data:any;
  getdist:any;
  distselect:any;
  d_data:any;
  userdata:any;
  active1:boolean=false;
  active2:boolean=false;
  namevalid=true;
  phonevalid=true;
  prevent_init_name=false;
  prevent_init_phone=false;
  input_name:any;
  input_phone:any;
// <<<<<<< HEAD
  
//   ngOnInit(): void {
//     this.input_name=document.getElementById('itemname');
//     this.input_phone=document.getElementById('itemphone');
// =======

  pathname:any;
  ngOnInit(): void {
    this.input_name=document.getElementById('itemname');
    this.input_phone=document.getElementById('itemphone');
    this.pathname=window.location.href.split('#').pop();
    console.log("path:" +window.location.href.split('#').pop())
    localStorage.setItem('address', decodeURIComponent(this.pathname));


    this.apollo.watchQuery<any>({
      query: SHOW_CLIENT_TYPE,
      variables:{
        id:""
      }
    })
      .valueChanges
      .subscribe(({ data }) => {
        //this.loading = loading;
        this.posts = data;
        this.ctmdata=this.posts.getClientTypeData
        console.log(this.ctmdata);
        
       
       //this.putdata(this.posts);
      });
      this.apollo.watchQuery<any>({
        query: SHOW_OP,
        variables:{
            id:""
          }
      })
        .valueChanges
        .subscribe(({ data }) => {
          //this.loading1 = loading;
          this.posts1 = data;
          this.opdata=this.posts1.getOprnModeData
          console.log(this.opdata);
        // this.putdata(this.posts);
        });
    this.apollo.watchQuery<any>({
      query: SHOW_DIST,
      // pollInterval:100
     
    })
      .valueChanges
      .subscribe(({ data }) => {
        //this.loading = loading;
        this.districts = data;
        console.log(data);
        this.distdata=this.districts.getDistrict
       // console.log(this.ctmdata);
        
       
       //this.putdata(this.posts);
      });
    this.radioamc=document.getElementById('AMC');
    this.radiorental=document.getElementById('Rental');
    this.radioactive=document.getElementById('a');
    this.radioinactive=document.getElementById('i');
    this.route.params.forEach((params: any) => {
      this.item=params['id1']
      })

  this.apollo.watchQuery<any>({
    query: SHOW_CLIENT,
    // pollInterval:200,
    variables:{
      id: this.item,
      active:''
    }
  })
    .valueChanges
    .subscribe(({ data }) => {
      this.posts = data;
      console.log(this.posts);
      this.client_name=this.posts.getClient[0].client_name;
      this.Schema_Name = this.posts.getClient[0].schema_name;
      this.client_addr=this.posts.getClient[0].client_addr;
      this.tech_person=this.posts.getClient[0].tech_person;
      this.tech_designation=this.posts.getClient[0].tech_designation;
      this.phone_no=this.posts.getClient[0].phone_no;
      this.mail=this.posts.getClient[0].email;
      this.working_hrs=this.posts.getClient[0].working_hrs;
      this.remarks1=this.posts.getClient[0].remarks;
      this.supportmode=this.posts.getClient[0].support_mode;
      this.supportstatus=this.posts.getClient[0].support_status;
      this.clientid=this.posts.getClient[0].client_type_id;
      this.opid=this.posts.getClient[0].oprn_mode_id;
      this.getdist=this.posts.getClient[0].district_id;
      this.amcdate=this.posts.getClient[0].amc_upto;
      this.amcdate =this.datepipe.transform(this.amcdate, 'yyyy-MM-dd');
      this.rentaldate=this.posts.getClient[0].rental_upto;
      this.rentaldate =this.datepipe.transform(this.rentaldate, 'yyyy-MM-dd');
      if(this.supportmode=='A'){
        this.radioamc.checked=true;
        this.AMC_RENTAL=document.getElementById('itemrental');
        this.AMC_RENTAL.value='';
        this.amc_rental_Check=false;
      }
      else{
      this.radiorental.checked=true;
        this.AMC_RENTAL=document.getElementById('itemamc');
        this.AMC_RENTAL.value='';
        this.amc_rental_Check=true;
      }
      if(this.supportstatus=='A'){
      this.radioactive.checked=true;
      this.active1=true;
      this.active2=false;
      this.radioinactive.checked=false;
      } 
      else
      {
        this.active1=false;
        this.active2=true;
        this.radioinactive.checked=true;
        this.radioactive.checked=false;
      }
      //console.log(this.remarks1)
     //this.putdata(this.posts);
    //  this.apollo.watchQuery<any>({
    //   query: SHOW_CLIENT_1,
    //   variables:{
    //     id:this.clientid
    //   }
    // })
    //   .valueChanges
    //   .subscribe(({ data }) => {
    //     //this.loading = loading;
    //     this.posts = data;
    //     this.clidselect=this.posts.getClientTypeData[0].client_id;
    //     this.client_data=this.posts.getClientTypeData[0].client_type;
    //   });
    //   this.apollo.watchQuery<any>({
    //     query: SHOW_OP_1,
    //     variables:{
    //       id:this.opid
    //     }
    //   })
    //     .valueChanges
    //     .subscribe(({ data }) => {
    //       this.posts = data;
    //       this.opselect=this.posts.getOprnModeData[0].oprn_id;
    //       this.op_data=this.posts.getOprnModeData[0].oprn_mode;
    //     });
        // for(let i=0;i<this.distdata.length;i++)
        // {
        //   if(this.getdist==this.distdata[i].id)
        //   {
        //     this.distselect=this.distdata[i].id;
        //     this.d_data=this.distdata[i].name;
        //   }
        // }
    }); 
  }
  send_data(cd:any,name:any,dist:any,comp:any,ctm:any,address:any,contact:any,designation:any,phone:any,email:any,amcupto:any,rentalupto:any,remarks:any,amcrentalradio:any,activeinactiveradio:any,workinghours:any,schema_name:any){
   
    this.getamc=document.getElementById('AMC');
    this.getrental=document.getElementById('Rental');
    this.getactive=document.getElementById('a');
    this.getinactive=document.getElementById('i');
    if(this.getamc.checked)
    amcrentalradio=this.getamc.value;
    if(this.getrental.checked)
    amcrentalradio=this.getrental.value;

    if(this.getactive.checked)
    activeinactiveradio=this.getactive.value;
    if(this.getinactive.checked)
    activeinactiveradio=this.getinactive.value;
    this.apollo.mutate({
      mutation:UPDATE_CLIENT,
      variables:{
        id:cd,
        client_name: name,
        district_id: dist,
        client_type_id: ctm,
        oprn_mode_id: comp,
        client_addr: address,
        tech_person: contact,
        tech_designation: designation,
        phone_no: phone,
        email: email,
        working_hrs: workinghours,
        support_mode: amcrentalradio,
        amc_upto: amcupto,
        rental_upto: rentalupto,
        support_status:activeinactiveradio,
        remarks: remarks,
        user_id:localStorage.getItem("UserId"),
        schema_name:schema_name
        
      }
    }).subscribe(({data})=>{this.userdata=data;console.log(data);
      console.log("data:" +JSON.stringify(data))
      console.log(this.userdata.updateClient.message)
      if(this.userdata.updateClient.success==1)
      { 
        //this.done=true;
        localStorage.setItem('updatec','1');
        this.router.navigate(['/addclient/dashboard'])
      }


      else
        this.showsnackbar();
    },error=>{ this.showsnackbar()
   } );


    // console.log(cd+" "+name+" "+dist+" "+comp+" "+ctm+" "+address+" "+contact+" "+designation+" "+phone+" "+email+" "+amcupto+" "+rentalupto+" "+remarks+" "+amcrentalradio+" "+activeinactiveradio)

  }
  showsnackbar() {


    // alert("error");
     this.x = document.getElementById("snackbar");
     this.x.className = "show";
     setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
   }


prevent_null(e:any){this.done=false;

  if(e.target.id=='itemname')
  {
    if(e.target.value=='')
    {
      this.namevalid=true; this.prevent_init_name=true; this.done=true;
      this.input_name.style.border="solid red 1px"
     // this.hide_val=true;
    }
    else
     {this.done=false;this.namevalid=false;this.input_name.style.border="solid lightgrey 1px"; this.prevent_init_name=false;}
  }
  else if(e.target.id=='itemphone')
  {
    if(e.target.value=='')
    {
      this.phonevalid=true;
      this.prevent_init_phone=true;
      this.done=true;
      this.input_phone.style.border="solid red 1px"
      //this.hide_val=true;
    }
    else

     {this.done=false; this.phonevalid=false;this.input_phone.style.border="solid lightgrey 1px"; this.prevent_init_phone=false;}}}


change_rentalupto(v:any){}
select_status(){}
select_mode(event:any,val:any){
  if(val=='Amc' && event.target.checked){
  this.AMC_RENTAL=document.getElementById('itemrental');
  this.AMC_RENTAL.value='';
  this.amc_rental_Check=false;
  }
  else{
    this.AMC_RENTAL=document.getElementById('itemamc');
    this.AMC_RENTAL.value='';
  this.amc_rental_Check=true;

  }
}
change_amcupto(v:any){}
select_district(v:any){}
select_client_type(v:any){}
select_operation(v:any){}

preventNonNumericalInput(e:any){e = e || window.event;

    
  var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
  var charStr = String.fromCharCode(charCode);

  if (!charStr.match(/^[0-9]+$/))
   { e.preventDefault();}}
check_email_validity(e:any){}
}