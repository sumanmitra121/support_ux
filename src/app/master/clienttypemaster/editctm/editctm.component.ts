import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {Apollo, gql} from 'apollo-angular';
import { CtmdashboardComponent } from '../ctmdashboard/ctmdashboard.component';
const EDIT_CLIENT_TYPE=gql`
mutation updateMaster($id:String, $name: String,$user_id: String) {
  updateMaster(id:$id,name: $name, user_id: $user_id, db_type: 1) {
   message
  }
}`;
@Component({
  selector: 'app-editctm',
  templateUrl: './editctm.component.html',
  styleUrls: ['./editctm.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class EditctmComponent implements OnInit {
  x:any;
  constructor(private ctmdash:CtmdashboardComponent, private route:ActivatedRoute,private apollo: Apollo,private router:Router) { }
  userdata:any;
  error=false;
  disable_button=false;
  done=false;
  input_tag:any;
  msg='';
  item1:any;
  item2:any;
  pathname:any;
  ngOnInit(): void {
    this.pathname=window.location.href.split('#').pop();
    console.log("path:" +window.location.href.split('#').pop())
    localStorage.setItem('address', decodeURIComponent(this.pathname));
    this.route.params.forEach((params: any) => {
      this.item1 = params['id1'];
      this.item2 = params['id2'];})
     
     //  console.log(this.item1+" "+this.item2);
    this.input_tag=document.getElementById('itemtype');
    
  }

  showsnackbar() {
    // alert("error");
     this.x = document.getElementById("snackbar");
     this.x.className = "show";
     setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
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
      console.log(e.target.value);
      this.error=false
      this.done=false
      this.disable_button=false;
      this.input_tag.style.border="1px solid lightgrey";
    }
  }
  send_item(v1:any,v2:any){
    if(v2=='')
    {
      this.done=false;
      this.error=true;
      this.msg="Please provide client type!"
      this.input_tag.style.border="solid red 1px"

    }
    else
     {this.apollo.mutate({
      mutation:EDIT_CLIENT_TYPE,
      variables:{
        id:v1,
        name:v2,
        user_id:localStorage.getItem("UserId")
        
      }
    }).subscribe(({data})=>{this.userdata=data;console.log(data);
      console.log("data:" +JSON.stringify(data))
      console.log(this.userdata.updateMaster.message)
      if(this.userdata.updateMaster.message=='Updated Successfully !!')
      { // this.done=true;this.msg="Client Type updated successfully!!";
     // this.ctmdash.ngOnInit();
        localStorage.setItem('updatectm','1')
        this.router.navigate(['/clienttypemaster/dashboard'])
     
        }
        else
        this.showsnackbar();
    },error=>{ this.showsnackbar()
    });
      this.done=true;
      //this.msg="Client type updated successfully!!"
    // this.input_tag.value='';
     this.disable_button=false;
     this.input_tag.style.border="1px solid lightgrey";
    }
  }
  clear_field(){
    this.input_tag.value='';
    this.error=false;
    this.done=false;
    this.input_tag.style.border="1px solid lightgrey";
  }
  go_to(){
    this.route
  }
}
