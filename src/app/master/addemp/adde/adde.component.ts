import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { Router } from '@angular/router';
const ADD_EMP=gql`
mutation insertEmpMaster($emp_code: Int,$emp_name: String,$phone_no:String,$email: String
  $emp_designation: String,
  $remarks: String) {
    insertEmpMaster(emp_code: $emp_code, emp_name: $emp_name,phone_no:$phone_no,email:$email,emp_designation:$emp_designation,remarks:$remarks) {
     message
    }
  }`
@Component({
  selector: 'app-adde',
  templateUrl: './adde.component.html',
  styleUrls: ['./adde.component.css', 
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class AddeComponent implements OnInit {

  constructor(private apollo: Apollo,private router:Router) { }
  userdata:any;
  spinshow=false;
  notavalidemail=true;
   confirm_email='';
   input_code:any;
   input_name:any;
   input_email:any;
   input_phone:any;
   input_designation:any;
   input_remarks:any;
   code=false;
   name=false;
   ph=false;
   email_null=false;
   msg='';
   done=false;
   x:any;
  ngOnInit(): void {
    
    localStorage.setItem('address', '/addemp/adde');
    this.input_code=document.getElementById('itemcode');
    this.input_name=document.getElementById('itemname');
    this.input_phone=document.getElementById('itemph');
    this.input_email=document.getElementById('itememail')
    this.input_designation=document.getElementById('itemdesignation');
    this.input_remarks=document.getElementById('itemremarks');
    this.done=false;
  }
  prevent_null(e:any){
    this.done=false;
    if(e.target.id=='itemcode')
    {
      if(e.target.value=='')
      {
        this.code=true;
        this.input_code.style.border="solid red 1px"
       // this.hide_val=true;
      }
      else
       {this.code=false;this.input_code.style.border="solid lightgrey 1px"}
    }
    else if(e.target.id=='itemname')
    {
      if(e.target.value=='')
      {
        this.name=true;
        this.input_name.style.border="solid red 1px"
        //this.hide_val=true;
      }
      else
       {this.name=false;this.input_name.style.border="solid lightgrey 1px"}
    }
    else if(e.target.id=='itemph')
    {
      if(e.target.value=='')
      {
        this.ph=true;
        this.input_phone.style.border="solid red 1px"
       // this.hide_val=true;
      }
      else
       {this.ph=false;this.input_phone.style.border="solid lightgrey 1px";}
    }
    else if(e.target.id=='itememail')
    {
      if(e.target.value=='')
      {
        this.email_null=true;
        this.confirm_email='';
        this.input_email.style.border="solid red 1px"
       // this.hide_val=true;
      }
      else
       {this.email_null=false; this.input_email.style.border="solid lightgrey 1px"}
    }
    else{}

  }
  preventNonNumericalInput(e:any){
    e = e || window.event;
    
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[0-9]+$/))
     { e.preventDefault();}

  }
  
  check_email_validity(event: any) {
    var em = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    if (!em.test(event.target.value)) { this.confirm_email = "*Not a valid Email ID";this.input_email.style.border="solid red 1px";this.notavalidemail=true; if(event.target.value==''){this.notavalidemail=false;this.email_null=true;this.input_email.style.border="solid red 1px"}}
    else { this.notavalidemail=false; this.email_null=false;this.input_email.style.border="solid lightgrey 1px"}
  }
  send_data(ecode:any,ename:any,phone:any,email:any,designation:any,remarks:any){
    //console.log(ecode+" "+ename+" "+phone+" "+email+" "+designation+" "+remarks);
    console.log(typeof(Number(ecode)))
    this.apollo.mutate({
      mutation:ADD_EMP,
      variables:{
        emp_code:Number(ecode),
        emp_name:ename,
        phone_no:phone,
        email:email,
        emp_designation:designation,
        remarks:remarks
        
      }
    }).subscribe(({data})=>{this.userdata=data;console.log(data);
      console.log("data:" +JSON.stringify(data))
      console.log(this.userdata.insertEmpMaster.message)
      if(this.userdata.insertEmpMaster.message=='Data Inserted Successfully')
     { localStorage.setItem('adde','1');
     this.clear_all()
       this.router.navigate(['/addemp/dashboard'])}
       else
       this.showsnackbar();
   },error=>{ this.showsnackbar()
  } );
    
  }
  showsnackbar() {
    // alert("error");
     this.x = document.getElementById("snackbar");
     this.x.className = "show";
     setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
   }
  clear_all(){
    this.spinshow=true;
    setTimeout(()=>{this.spinshow=false;;},1000);
    this.input_code.value=''
    this.input_name.value=''
    this.input_email.value=''
    this.input_phone.value=''
    this.input_designation.value=''
    this.input_remarks.value=''
    this.code=false;
    this.name=false;
    this.ph=false;
    this.email_null=false;
    this.notavalidemail=true;
    this.done=false;
    this.input_code.style.border="solid lightgrey 1px"
    this.input_name.style.border="solid lightgrey 1px"
    this.input_phone.style.border="solid lightgrey 1px"
    this.input_email.style.border="solid lightgrey 1px"
  }
}
