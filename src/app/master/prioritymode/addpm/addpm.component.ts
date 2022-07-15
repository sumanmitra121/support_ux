import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { Router } from '@angular/router';
const ADD_PM=gql`
mutation insertMaster($pm: String,$user_id: String) {
  insertMaster(name: $pm, user_id: $user_id, db_type: 4) {
   message
  }
}`;
@Component({
  selector: 'app-addpm',
  templateUrl: './addpm.component.html',
  styleUrls: ['./addpm.component.css', 
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class AddpmComponent implements OnInit {

  constructor(private apollo: Apollo,private router:Router ) { }
  x:any;
 userdata:any;
  input_tag:any;
  msg='';
  error=false;
  done=false;
  disable_button=true;
  spinshow=false;
  ngOnInit(): void {
    
    localStorage.setItem('address','/prioritymode/addpm'); 
    this.input_tag=document.getElementById('itemname');
  }
  prevent_null(e:any){
    if(e.target.value==''){
      this.done=false;
      this.error=true;
      this.disable_button=true;
      this.msg="please provide priority!"
      this.input_tag.style.border="solid red 1px"
    }
    else
    {
      console.log(e.target.value);
      this.error=false
      this.done=false
      this.disable_button=false;
      this.input_tag.style.border="1px solid lightgrey";
    }
  }
  send_item(v:any){
    this.msg='';
    if(v=='')
    {
      this.done=false;
      this.error=true;
      this.msg="Please provide priority!"
      this.input_tag.style.border="solid red 1px"

    }
    else
     {this.apollo.mutate({
      mutation:ADD_PM,
      variables:{
        pm:v,
        user_id:localStorage.getItem("UserId")
      }
    }).subscribe(({data})=>{this.userdata=data;console.log(data);
      console.log("data:" +JSON.stringify(data))
      console.log(this.userdata.insertMaster.message)
      if(this.userdata.insertMaster.message=='Inserted Successfully !!')
      { localStorage.setItem('addpm','1');
      this.clear_field();
        this.router.navigate(['/prioritymode/dashboard'])}
        else
        this.showsnackbar();
    },error=>{ this.showsnackbar()
    });
      this.done=true;
      
    // this.input_tag.value='';
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
    this.input_tag.value='';
    this.error=false;
    this.done=false;
    this.msg='';
    this.disable_button=true;
    this.input_tag.style.border="1px solid lightgrey";
      
  }
}
