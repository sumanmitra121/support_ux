import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {Apollo, gql} from 'apollo-angular';
import { Subscription } from 'rxjs';
const SHOW_EMP=gql`
query getEmp($id: String!){
  getEmp(id:$id){
    id
    emp_code
    emp_name
    phone_no
    email
    emp_designation
    remarks
  }
}`
const EDIT_EMP=gql`
mutation updateEmp($emp_code:Int, $id:String, $emp_name: String,$phone_no: String, $email:String, $emp_designation:String, $remarks: String,$user_id:String){
  updateEmp(emp_code: $emp_code, emp_name: $emp_name, phone_no: $phone_no, email: $email, emp_designation: $emp_designation, remarks:$remarks, id: $id, user_id:$user_id){
    success
    message
  }
}
`;
@Component({
  selector: 'app-editemp',
  templateUrl: './editemp.component.html',
  styleUrls: ['./editemp.component.css', 
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class EditempComponent implements OnInit {

  item1: any;
  item2: any;
  loading: boolean=false;
  posts: any;
  private querySubscription: Subscription = new Subscription;
  constructor(private router:Router,private apollo:Apollo,private route:ActivatedRoute) { }
 
  userdata:any;
  notavalidemail=true;
  confirm_email='';
  item0:any;
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
  item_email:any;
  item_phone:any;
  item_desig:any;
  item_remarks:any;
  disable_button=false;
  msg=''
  done=false;
  x:any;
  pathname:any;
 ngOnInit(): void {
  this.pathname=window.location.href.split('#').pop();
  console.log("path:" +window.location.href.split('#').pop())
 
 console.log("pathname:" +decodeURIComponent(this.pathname));
 localStorage.setItem('address', decodeURIComponent(this.pathname));
  this.route.params.forEach((params: any) => {
    this.item0=params['id1']
    this.item1 = params['id2'];
    this.item2 = params['id3'];})
   this.input_code=document.getElementById('itemcode');
   this.input_name=document.getElementById('itemname');
   this.input_phone=document.getElementById('itemph');
   this.input_email=document.getElementById('itememail')
   this.input_designation=document.getElementById('itemdesignation');
   this.input_remarks=document.getElementById('itemremarks');
   this.querySubscription = this.apollo.watchQuery<any>({
    query: SHOW_EMP,
    variables:{
      id: this.item0
    }
  })
    .valueChanges
    .subscribe(({ data, loading }) => {
      this.loading = loading;
      this.posts = data;
      console.log(this.posts);
      this.item_email=this.posts.getEmp[0].email;
      this.item_phone=this.posts.getEmp[0].phone_no;
      this.item_desig=this.posts.getEmp[0].emp_designation;
      this.item_remarks=this.posts.getEmp[0].remarks
     //this.putdata(this.posts);
    });
 }
 prevent_null(e:any){
   if(e.target.id=='itemcode')
   {
     if(e.target.value=='')
     {
       this.code=true;
       this.disable_button=true;
       this.input_code.style.border="solid red 1px"
      // this.hide_val=true;
     }
     else
      {this.disable_button=false;this.code=false;this.input_code.style.border="solid lightgrey 1px"}
   }
   else if(e.target.id=='itemname')
   {
     if(e.target.value=='')
     {
       this.name=true;
       this.disable_button=true;
       this.input_name.style.border="solid red 1px"
       //this.hide_val=true;
     }
     else
      {this.disable_button=false;this.name=false;this.input_name.style.border="solid lightgrey 1px"}
   }
   else if(e.target.id=='itemph')
   {
     if(e.target.value=='')
     {
       this.ph=true;
       this.disable_button=true
       this.input_phone.style.border="solid red 1px"
      // this.hide_val=true;
     }
     else
      {this.disable_button=false;this.ph=false;this.input_phone.style.border="solid lightgrey 1px";}
   }
   else if(e.target.id=='itememail')
   {
     if(e.target.value=='')
     {
       this.email_null=true;
       this.confirm_email='';
       this.disable_button=true;
       this.input_email.style.border="solid red 1px"
      // this.hide_val=true;
     }
     else
      {this.disable_button=false;this.email_null=false; this.input_email.style.border="solid lightgrey 1px"}
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
   if (!em.test(event.target.value)) { this.confirm_email = "*Not a valid Email ID";this.input_email.style.border="solid red 1px";this.disable_button=true;this.notavalidemail=true; if(event.target.value==''){this.notavalidemail=false;this.email_null=true;this.input_email.style.border="solid red 1px"; this.disable_button=true}}
   else { this.notavalidemail=false; this.email_null=false;this.input_email.style.border="solid lightgrey 1px"}
 }
 send_data(ecode:any,ename:any,phone:any,email:any,designation:any,remarks:any){
  this.apollo.mutate({
    mutation:EDIT_EMP,
    variables:{
      id:this.item0,
      emp_code:Number(ecode),
      emp_name: ename,
      phone_no: phone, 
      email:email, 
      emp_designation:designation, 
      remarks: remarks,
      user_id:localStorage.getItem("UserId")
    }
  }).subscribe(({data})=>{this.userdata=data;console.log(data);
    console.log("data:" +JSON.stringify(data))
    console.log(this.userdata.updateEmp.message)
    if(this.userdata.updateEmp.message=='Updated Successfully !!')
    {
      localStorage.setItem('updatee','1');
      // this.done=true;this.msg="Employee updated successfully!!";
      this.router.navigate(['/addemp/dashboard'])
    }
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
 }


}
