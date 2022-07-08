import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular'; 
import { Router } from '@angular/router'
const ADD_TS=gql`
mutation insertMaster($ts: String,$user_id: String) {
  insertMaster(name: $ts, user_id: $user_id, db_type: 3) {
   message
  }
}`;
@Component({
  selector: 'app-addts',
  templateUrl: './addts.component.html',
  styleUrls: ['./addts.component.css', 
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class AddtsComponent implements OnInit {

  constructor(private apollo:Apollo,private router:Router) { }
  x:any;

  spinshow=false;

  userdata:any;
  input_tag:any;
  msg='';
  error=false;
  done=false;
  disable_button=true;
  ngOnInit(): void {
    
    localStorage.setItem('address','/ticketstatus/addts');  
    this.input_tag=document.getElementById('itemname');
  }
  prevent_null(e:any){
    if(e.target.value==''){
      this.done=false;
      this.error=true;
      this.disable_button=true
      this.msg="Please provide ticket status!"
      this.input_tag.style.border="solid red 1px"
    }
    else
    {
      console.log(e.target.value);
      this.error=false
      this.done=false
      this.disable_button=false
      this.input_tag.style.border="1px solid lightgrey";
    }
  }
  send_item(v:any){
    this.msg='';
    if(v=='')
    {
      this.done=false;
      this.error=true;
      this.msg="Please provide ticket status!"
      this.input_tag.style.border="solid red 1px"

    }
    else
     {//alert(v);
      //alert(v);
        this.apollo.mutate({
          mutation:ADD_TS,
          variables:{
            ts:v,
            user_id:localStorage.getItem("UserId")
          }
        }).subscribe(({data})=>{this.userdata=data;console.log(data);
          console.log("data:" +JSON.stringify(data))
          console.log(this.userdata.insertMaster.message)
          if(this.userdata.insertMaster.message=='Inserted Successfully !!')
          // this.msg="Ticket status added successfully!!"
          { localStorage.setItem('addts','1');
            this.clear_field();
            this.router.navigate(['/ticketstatus/dashboard'])
          }
          else
          this.showsnackbar();
      },error=>{ this.showsnackbar()
      });
      this.done=true;
     // this.msg="Ticket status added successfully!!"
    
     this.disable_button=true
     this.input_tag.style.border="1px solid lightgrey";
    }
  }
  showsnackbar() {
    // alert("error");
     this.x = document.getElementById("snackbar");
     this.x.className = "show";
     setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
   }
  clear_field(){
    this.spinshow=true;
    setTimeout(()=>{this.spinshow=false;;},1000);
    this.input_tag.value='';
    this.error=false;
    this.done=false;
    this.msg='';
    this.disable_button=true;
    this.input_tag.style.border="1px solid lightgrey";
      
  }
}
