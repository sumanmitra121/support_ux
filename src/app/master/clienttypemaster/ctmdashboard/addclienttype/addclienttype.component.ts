import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { Router } from '@angular/router'
const ADD_CLIENT_TYPE=gql`
mutation insertMaster($client_type: String,$user_id: String) {
  insertMaster(name: $client_type, user_id: $user_id, db_type: 1) {
   message
  }
}`;



@Component({
  selector: 'app-addclienttype',
  templateUrl: './addclienttype.component.html',
  styleUrls: ['./addclienttype.component.css', 
  '../../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../../assets/masters_css_js/css/apps.css',
  '../../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../../assets/masters_css_js/css/res.css']
})
export class AddclienttypeComponent implements OnInit {


 
  User:any;
  x:any;
  constructor(private apollo: Apollo,private router:Router) { }

 spinshow=false;

  input_tag:any;
  msg='';
  error=false;
  userdata:any;
  done=false;
  disable_button=true;
  ngOnInit(): void {
    
    localStorage.setItem('address','/clienttype/addctm');
    this.User=localStorage.getItem("UserId");
    console.log("type:" +typeof(this.User));
    this.input_tag=document.getElementById('itemname');
  }
  prevent_null(e:any){
    if(e.target.value==''){
      this.done=false;
      this.error=true;
      this.disable_button=true;
      this.msg="Please provide client type!"
      this.input_tag.style.border="solid red 1px"
    }
    else
    {
      //console.log(e.target.value);
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
      this.msg="Please provide client type!"
      this.input_tag.style.border="solid red 1px"

    }
    else
     {
       this.apollo.mutate({
        mutation:ADD_CLIENT_TYPE,
        variables:{
          client_type:v,
          user_id:this.User
        }
      }).subscribe(({data})=>{this.userdata=data;console.log(data);
        console.log("data:" +JSON.stringify(data))
        console.log(this.userdata.insertMaster.message)
        if(this.userdata.insertMaster.message=='Inserted Successfully !!')
        {  localStorage.setItem('addctm','1');
          this.clear_field();
          this.router.navigate(['/clienttypemaster/dashboard'])
          this.msg="Client type added successfully!!"}
          else
          this.showsnackbar();
      },error=>{ this.showsnackbar()
     } );
      // alert(v);

      this.done=true;
      // console.log(this.userdata.message)
      
     //this.input_tag.value='';
     this.disable_button=true;
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
    // this.spinshow=false;
    
    this.input_tag.value='';
    this.error=false;
    this.done=false;
    this.msg='';
    this.disable_button=true;
    this.input_tag.style.border="1px solid lightgrey";
      
  }
}
