import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { global } from 'src/app/global';
import { commonEditor } from 'src/app/utilitY/commonEditor';

 declare var $:any;
// For update data
const EDITABLE=gql`
mutation updateAssignTkt($id:String!,$assign_engg: String!,
  $remarks:String!,$user_id:String!,$prob_reported:String!) {
  
    updateAssignTkt(id: $id
      assign_engg: $assign_engg
      remarks: $remarks
      user_id: $user_id,
      prob_reported:$prob_reported)  {

       success
       message

}
}`
;

// For getting employee list in dropdown of assigned To
const FOR_GET_EMPLOYEE=gql`
query{
  getEngList{
  id
  emp_name
  emp_code
}
}`
;




// For getting data automatically corrosponding id 
const GET_EDITABLE=gql`
query getSupportLogDtls($id:String!,$user_type:String!,$user_id:String!){
  getSupportLogDtls(id:$id,user_type:$user_type,user_id:$user_id){
    id
    tkt_no
    client_name
     district_name
    client_type
    oprn_mode
    working_hrs
    amc_upto
    rental_upto
    phone_no
    priority
    module
    prob_reported
    emp_name
    assign_engg
    remarks,
    log_in,
    file_path

  }
}` 


@Component({
  selector: 'app-editat',
  templateUrl: './editat.component.html',
  styleUrls: ['./editat.component.css', 
  '../../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../../assets/masters_css_js/css/apps.css',
  '../../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../../assets/masters_css_js/css/res.css']
})
export class EditatComponent implements OnInit {
  configEditor= commonEditor.config;

  company:boolean=false;
  emp:any;
  LogDate:any;
   id:any;
   emplist:any;
   edit:any;
    tkt_no:any
    client_name:any
     district_name:any
    client_type:any;
    oprn_mode:any;
    working_hrs:any;
    amc_upto:any;
    rental_upto:any;
    phone_no:any;
    priority_status:any;
    tkt_module:any;
    prob_reported:any;
    pathname:any;
    assss_id:any;
    emp_name:any;
    Remarks:any;
    x:any;
    prob:any
    for_issue:boolean=false;
    valid_issue:boolean=true;
    assign_to:any;
    _uploaded_type:any;
    _uploaded_img:any;
  constructor(private route:ActivatedRoute,private apollo:Apollo,private router:Router) { }
  // today= new Date();
  // todaysDataTime = '';
  valid_init=true;
  input_assigned:any;
  ngOnInit(): void {
    console.log(this.route.snapshot.params.u_type_code)
    this.prob=document.getElementById('itemissue');
    // console.log(this.prob.value)
    
    localStorage.setItem('edittickit','0');
    this.pathname=window.location.href.split('#').pop();
    console.log("path:" +window.location.href.split('#').pop())
    console.log("pathname:" +decodeURIComponent(this.pathname));
    localStorage.setItem('address', decodeURIComponent(this.pathname));
    this.assign_to=document.getElementById('assign');
    this.apollo.watchQuery<any>({
      query: FOR_GET_EMPLOYEE
      
    })
      .valueChanges
      .subscribe(({ data}) => {
        console.log(data);
        this.emplist=data.getEngList;
        console.log(this.emplist);
     
    
    this.route.params.forEach((params: any) => {
      this.id = params['id'];
      console.log(this.id )
      this.apollo.watchQuery<any>({
        query: GET_EDITABLE,
        variables:{
           id: this.id,
          user_type:localStorage.getItem('user_Type'),
          user_id:localStorage.getItem('UserId')


        }
        
      })
        .valueChanges
        .subscribe(({ data}) => {

          console.log(data);

          this.tkt_no=data.getSupportLogDtls[0].tkt_no;
          this.client_name=data.getSupportLogDtls[0].client_name;
           this.district_name=data.getSupportLogDtls[0].district_name;
          this.client_type=data.getSupportLogDtls[0].client_type;
          this.oprn_mode=data.getSupportLogDtls[0].oprn_mode;
          this.working_hrs=data.getSupportLogDtls[0].working_hrs;
          this.amc_upto=data.getSupportLogDtls[0].amc_upto;
          this.rental_upto=data.getSupportLogDtls[0].rental_upto;
          this.phone_no=data.getSupportLogDtls[0].phone_no;
          this.priority_status=data.getSupportLogDtls[0].priority;
          this.tkt_module=data.getSupportLogDtls[0].module;
          this.prob_reported=data.getSupportLogDtls[0].prob_reported;
          this.emp_name=data.getSupportLogDtls[0].emp_name;
          this.assss_id=data.getSupportLogDtls[0].assign_engg;
          this.valid_init = data.getSupportLogDtls[0].assign_engg!='' ? false : true;
          this.Remarks=data.getSupportLogDtls[0].remarks;
          this.LogDate=data.getSupportLogDtls[0].log_in;
          this._uploaded_img = global.raw_url+data.getSupportLogDtls[0].file_path;
          this._uploaded_type = data.getSupportLogDtls[0].file_path ? ( data.getSupportLogDtls[0].file_path.substring(data.getSupportLogDtls[0].file_path.length -3) == 'pdf' ? 1 : 2) : 0; 
         if(this.prob_reported==""){
          this.valid_issue=true;
          console.log("empty",this.prob_reported)
          this.for_issue=true;
         }
         else{
          this.valid_issue=false;
          console.log("empty",this.prob_reported)
          this.for_issue=false;
         }
         console.log(this.valid_issue);
         
           console.log(this.emplist.length)
         for(let i=0;i<this.emplist.length;i++){

               if(this.assss_id== this.emplist[i].id)
               {
                this.emp_name=this.emplist[i].emp_name

               }
         }


        
         if(this.assss_id==null)
         this.valid_init=true;
        else
         this.valid_init=false;

          // $('.select2').select2({val : this.assss_id});
          $('.ass_engg').val(this.assss_id).trigger('change');
        })
    })
  })
  $('.ass_engg').select2({}).on('select2:select',(e:any)=>{this.select_assigned(e.params.data.id);})  
}  
  select_assigned(v:any){
    if(v==''){
    this.company=true;
     this.valid_init=true;
     this.assign_to.style.border="solid red 1px"
    }
    else{
    this.company=false;
     this.valid_init=false;
     this.assign_to.style.border="solid lightgrey 1px"
    }
  }
  preventNonNumericalInput(e:any){}

  go_to_dashboard(v1:any,v2:any,v3:any,v4:any,v5:any,v6:any,v7:any,v8:any,v9:any,v10:any,v11:any,v12:any,v13:any,v14:any){
   
    // console.log("Date:" +v1);
    // console.log("Tickitno:" +v2);
    // console.log("Client:" +v3);
    // console.log("District:" +v4);
    // console.log("Clienttype:" +v5);
    // console.log("operationalmode:" +v6);
    // console.log("workinghours:" +v7);
    // console.log("amcupto:" +v8);
    // console.log("rentalupto:" +v9);
    // console.log("phone:" +v10);
    // console.log("prioritystatus:" +v11);
    // console.log("module:" +v12);
    console.log("issue:" +v13);
    // console.log("assignedto:" +v14);
    // console.log("remarks:" +v15);
    // console.log("id:" +this.id );
    
    this.apollo.mutate({
      mutation: EDITABLE,
      variables:{
        id:this.id,
        assign_engg:v14, 
        remarks:this.Remarks ? this.Remarks : '',
        user_id: localStorage.getItem("UserId"),
        prob_reported:v13

      }
    }).subscribe(({data})=>{
      console.log(data);
      this.edit=data;
      if(this.edit.updateAssignTkt.success==1){
        localStorage.setItem('edittickit','1');
        localStorage.setItem('E_notify','1');
        if(this.route.snapshot.params.u_type_code > 0){

          this.router.navigate(['/operations/assignticket',this.route.snapshot.params.u_type_code]).then(() => {
            window.location.reload();
        })
        }
        else{
          this.router.navigate(['/op_assignticket',this.route.snapshot.params.u_type_code]).then(() => {
            window.location.reload();
        })
        }
        
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

   prevent_null_issue(e:any){
  
      if(e.target.value==""){
          this.for_issue=true;
          this.valid_issue=true;
          this.prob.style.border="solid red 1px";
      }
      else{
        this.for_issue=false;
        this.valid_issue=false;
        this.prob.style.border="solid lightgrey 1px";

     
   }
  }


}
