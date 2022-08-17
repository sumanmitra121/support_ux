import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {Apollo, gql} from 'apollo-angular';
const EDIT_TS=gql`
mutation updateMaster($id:String, $name: String,$user_id: String) {
  updateMaster(id:$id,name: $name, user_id: $user_id, db_type: 3) {
   message
  }
}`;
@Component({
  selector: 'app-editts',
  templateUrl: './editts.component.html',
  styleUrls: ['./editts.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class EdittsComponent implements OnInit {

  item1: any;
  item2: any;
  x:any;

  constructor(private route:ActivatedRoute,private apollo: Apollo,private router:Router) { }
  userdata:any;

  disable_button=false;
  error=false;
  done=false;
  input_tag:any;
  msg='';
  pathname:any;
  ngOnInit(): void {
     this.pathname=window.location.href.split('#').pop();
     console.log("path:" +window.location.href.split('#').pop())
     localStorage.setItem('address', decodeURIComponent(this.pathname));
    // console.log("pathname:",window.location.href);
    this.route.params.forEach((params: any) => {
      this.item1 = params['id1'];
      this.item2 = params['id2'];})
    this.input_tag=document.getElementById('itemtype');
    

  }
  prevent_null(e:any){
    if(e.target.value==''){
      this.done=false;
      this.error=true;
      this.disable_button=true;
      this.msg="please provide ticket status!"
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
      this.msg="Please provide ticket status!"
      this.input_tag.style.border="solid red 1px"

    }
    else
     {this.apollo.mutate({
      mutation:EDIT_TS,
      variables:{
        id:v1,
        name:v2,
        user_id:localStorage.getItem("UserId")
      }
    }).subscribe(({data})=>{this.userdata=data;console.log(data);
      console.log("data:" +JSON.stringify(data))
      console.log(this.userdata.updateMaster.message)
      if(this.userdata.updateMaster.message=='Updated Successfully !!')
      // this.msg="Ticket status updated successfully!!"
      {localStorage.setItem('updatets','1')
      this.router.navigate(['/ticketstatus/dashboard'])}
      else
      this.showsnackbar();
  },error=>{ this.showsnackbar()
  });
      this.done=true;
      
     //this.input_tag.value='';
     this.disable_button=false;
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
    this.input_tag.value='';
    this.error=false;
    this.done=false;
    this.input_tag.style.border="1px solid lightgrey";
      
  }
}
