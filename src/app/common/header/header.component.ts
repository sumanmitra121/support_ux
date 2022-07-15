import { Component, OnDestroy, OnInit,ViewEncapsulation,HostListener, Input } from '@angular/core';
// import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import moment from 'moment';


import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { global } from 'src/app/global';
import { ConnectionService } from 'ng-connection-service';
declare var $: any; 
const REMOVE_IMAGE=gql`
mutation removeImage($user_id:String!){
  removeImage(user_id: $user_id){
    message
    success
  }
}
`;

const FETCH=gql`
query getSuppLogDone($user_type:String!,$user_id:String!){
  getSuppLogDone(user_type:$user_type , user_id:$user_id){
    id
    client_name
    phone_no
    tkt_no
    emp_name
    priority
    tktStatus
    log_in
    work_status
    tkt_status
    prob_reported
  }
}`;


const GET_RAISETICKITE=gql`
query getSupportLogDtls($id:String!,$user_type:String!,$user_id:String!){
  getSupportLogDtls(id:$id,tag:"0",user_type:$user_type,user_id:$user_id){
    id
    client_name
    phone_no
    tkt_no
    emp_name
    priority
    tktStatus,
    tkt_status
    log_in
    work_status
    prob_reported
  }
}`
;



const APPROVE=gql`
mutation resetPassword($pass:String!,$user_email:String!){
  resetPassword(password:$pass, user_email:$user_email){
    success
    message
  }
}`;

const GET_PROFILE=gql`
query getProfileDtls($user_email:String!,$user_type:String!){
  getProfileDtls(user_email:$user_email, user_type: $user_type){
    id
    user_type
    emp_code
    emp_name
    phone_no
    email
    emp_designation
    remarks
    client_name
    district_id
    client_type_id
    oprn_mode_id
    client_addr
    working_hrs
    amc_upto
    rental_upto
    image
  }
}`;
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

const img_upload=gql`
mutation uploadImage($user_id: String!, $image: Upload!){
  uploadImage(user_id: $user_id, image: $image){
    message
    success
  }
}`;


const UPDATE_PROFILE=gql`
mutation  updateProfile($id:String!, $user_type:String!, $designation: String!, $phone_no:String!, $emp_name:String!, $district_id:String!, $client_name:String!, $oprn_mode_id:String!,$client_type_id:String!, $client_addr:String!, $working_hrs:String!){
  updateProfile(id: $id, user_type: $user_type, designation: $designation, phone_no: $phone_no, emp_name:$emp_name, district_id:$district_id, client_name:$client_name, oprn_mode_id:$oprn_mode_id,client_type_id:$client_type_id, client_addr:$client_addr, working_hrs:$working_hrs){
    success
    message
  }
}`
;
const UPDATE_LOGIN_STATUS=gql`
query   getUserDetailsById($user_email:String! ){
  getUserDetailsById(user_email:$user_email){
    user_type,
    user_status
    login_status
  }
}`;

const SEE_UPDATE_STATUS=gql`
mutation  updateLoginStatus($user_id:String!,$login_status:String!)
{
  updateLoginStatus(user_id:$user_id,login_status:$login_status){
    message
    success

  }
}`



declare var showprofile: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',
  '../../../assets/css/bootstrap.css',
  '../../../assets/css/font-awesome.css',
  '../../../assets/css/apps.css',
  '../../../assets/css/apps_inner.css',
  '../../../assets/css/res.css']
})
export class HeaderComponent implements OnInit {

  // @Input()
  // emp: any;
  // @Input()
  // cli: any;



   upload:any;

  inpt:any;
  bgColor='primary';
  color='accent';
   emp_name:any;
   type:any;
   distdata:any;
   opdata:any;
   ctmdata:any;
   name:any;
    pn:any;
    Desig:any
   code_no:any;
   email_id:any;
   profile=false;
   today:any;
   District:any;
   client:any;
   client_addr:any
   op_mode:any;
   wrk_hrs:any;
   rental:any;
   amc:any;
   url:any;
   show_ConPassword:any;
   id:any;
   c_type:any
   success:any;
   modal:any;
   d_data:any;
   cl_type:any;
   oprn_mode:any;
   user_type:any;
   log_in_time:any;
   con:any;
   in:any;
   lie:any;
   status:any;
   N=moment().format('hh:mm:ss a');
   addHr:any;
   newPass:any;
   win:any;
   bacckend_url:any;
   uri=global.img;
   i:any;
   e:any;
   old_value:any;
   new_value:any;
   screenHeight:any;
   screenWidth:any;
   conf_pass:boolean=false;
   tkt_number:any;
   emp_:any;
   cl:any;
   tkt:any=[];
   t_done:any=[];
   old_done:any;
   Status = 'ONLINE';
   isConnected = true;
   
  constructor(private router:Router,public toastr: ToastrManager,private apollo:Apollo,private connectionService: ConnectionService) {

    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        // this.Status = "ONLINE";
        this.toastr.successToastr("You are back online",'Yeah!!',{
          position: 'top-full-width',
          animate:'slideFromTop',
          setTimeout:15000

        })
      }
      else {
       
        this.toastr.errorToastr("You are offline.Wait until your network is back" ,"Oops!!",{
          position: 'top-full-width',
          animate:'slideFromTop',
          });
        // this.Status = "OFFLINE";
      }
    })
    
   }

   

  
 

  ngOnInit(): void {
    // For Done

    this.apollo.watchQuery<any>({
      query: FETCH,
      variables:{
         user_type:localStorage.getItem('user_Type'),
         user_id:localStorage.getItem('UserId')
         
      },
     
      
    })
      .valueChanges
      .subscribe(({ data}) => {
        console.log(data);
         this.old_done=data.getSuppLogDone.length;
         console.log(this.old_done)
        
    
     })

     this.apollo.watchQuery<any>({
      query: FETCH,
      variables:{
         user_type:localStorage.getItem('user_Type'),
         user_id:localStorage.getItem('UserId')
         
      },
     pollInterval:20000
      
    })
      .valueChanges
      .subscribe(({ data}) => {
        console.log(data);
        console.log(this.old_done);
   
        if(this.old_done!=data.getSuppLogDone.length){
          if(localStorage.getItem('user_Type')=='A'|| localStorage.getItem('user_Type')=='T' ||localStorage.getItem('user_Type')=='M'){
          
          for(let i=(data.getSuppLogDone.length-1);i>=this.old_done;i--){
            this.playAudio();
            this.toastr.successToastr(data.getSuppLogDone[i].emp_name+" has successfully completed "+data.getSuppLogDone[i].client_name,'Task completed!!');
          }
          this.old_done=data.getSuppLogDone.length;
        }
      }
      
     })


     
  
  // For Pending
    this.apollo.watchQuery<any>({
      query: GET_RAISETICKITE,
      variables:{
         id:"",
         user_type:localStorage.getItem('user_Type'),
         user_id:localStorage.getItem('UserId')
         },
  })
   .valueChanges
  .subscribe(({ data}) => {
      this.old_value=data.getSupportLogDtls.length;

      console.log(this.old_value);
      for(let i=0;i<data.getSupportLogDtls.length;i++)
      {
        this.tkt[i]=data.getSupportLogDtls[i].tktStatus;
        // this.t_done[i]=data.getSupportLogDtls[i].work_status;
      }
      
   })

     

      this.apollo.watchQuery<any>({
        query: GET_RAISETICKITE,
        variables:{
           id:"",
           user_type:localStorage.getItem('user_Type'),
           user_id:localStorage.getItem('UserId')
           
        },
      
        pollInterval:20000
      })
        .valueChanges
        .subscribe(({data}) => {
          // if(this.new_value!=data.getSupportLogDtls.length){
            // if(this.old_value!=data.getSupportLogDtls.length){
              
            // }
            // this.old_value=data.getSupportLogDtls.length;
            // console.log(this.old_value);
  
            // console.log(this.new_value);
          // }
          console.log(data);
          console.log("Done Data:" +this.old_done)
          if(localStorage.getItem('user_Type')=='E'){
            console.log(this.old_value);

            if(this.old_value<data.getSupportLogDtls.length){
              console.log("OLD VALUE:" +this.old_value+" "+"NEW VALUE:"+data.getSupportLogDtls.length);
              
              this.old_value=data.getSupportLogDtls.length;
              this.playAudio();
           
              this.toastr.infoToastr("A new ticket has been assigned to you",data.getSupportLogDtls[data.getSupportLogDtls.length-1].client_name,{
                position:'top-right',
                animate:'slideFromRight',
                  toastTimeout: (10000)
              });
              // this.toastr.customToastr(
              //   '<span style="background-color: #282a3c;color:white; font-size: 16px; text-align: center;">A new ticket has been assigned to you</span>',
              //    'alert!!',
              //   { enableHTML: true }
              //   );
            }
            if(this.old_value>data.getSupportLogDtls.length){
          //  alert("Hello");
           console.log("OLD VALUE:" +this.old_value+" "+"New Value"+" "+data.getSupportLogDtls.length);
              this.apollo.watchQuery<any>({
                query: FETCH,
                variables:{
                   user_type:localStorage.getItem('user_Type'),
                   user_id:localStorage.getItem('UserId')
                   
                },
               
                
              })
                .valueChanges
                .subscribe(({ data}) => {
                  console.log(data);
              
                  //  this.old_done=data.getSuppLogDone.length;
                   console.log("New Data Leangth:" +data.getSuppLogDone.length +" "+"Old Data length"+" "+this.old_done);
                   if(this.old_done==data.getSuppLogDone.length){
                    this.playAudio();
                     this.toastr.warningToastr("An assignement of yours has been re-assigned to someone else","Alert!!",{   position:'top-right',
                     animate:'slideFromRight',
                       toastTimeout: (10000)
                   });
                   }
                  
              
               })
          

            }
          //  if(this.old_value>data.getSupportLogDtls.length && this.old_done==data.getSuppLogDone.length){
          //    alert("You are removed");

                      
          //     this.old_value=data.getSupportLogDtls.length;
          //   }
           

          
           
          }
            if(localStorage.getItem('user_Type')=='A'|| localStorage.getItem('user_Type')=='T' ||localStorage.getItem('user_Type')=='M') {
             
             for(let i=0;i<data.getSupportLogDtls.length;i++){
               
               if(this.tkt[i]!=data.getSupportLogDtls[i].tktStatus && data.getSupportLogDtls[i].tktStatus=='Working'){
                 console.log("Loop value:"+i);
                this.playAudio();
                this.toastr.infoToastr(data.getSupportLogDtls[i].emp_name+" has started working on "+data.getSupportLogDtls[i].client_name,'Task Commenced!!');
                this.tkt[i]=data.getSupportLogDtls[i].tktStatus;
               }
              //  if(this.t_done[i]!=data.getSupportLogDtls[i].work_status && data.getSupportLogDtls[i].work_status=="1"){
              //   this.toastr.infoToastr(data.getSupportLogDtls[i].emp_name+" has successfully completed "+data.getSupportLogDtls[i].client_name,'ALERT!!');
              //   this.t_done[i]=data.getSupportLogDtls[i].work_status;
              //  }
              
              //  else if(this.tkt[i]!=data.getSupportLogDtls[i].tktStatus && data.getSupportLogDtls[i].tktStatus=='Working'){

              //  }
             }
            //  if(data.getSupportLogDtls)
            }
            
           
         
        
       
  
         
        })
  


    // $(window).bind('beforeunload ', (eventObject:any) => {
      // alert("CLOSE WINDOW");
        //  this.logout();
        
      // console.log(eventObject);
      // this.e=eventObject;
    
      // localStorage.setItem('Event',eventObject);

       
        // eventObject.preventDefault();
        // console.log(eventObject.returnValue);
        // console.log(eventObject.type);
        // return eventObject.returnValue = "Are you sure you want to exit?";
        
   
  
   
     
// })
  

 
   console.log(localStorage.getItem('Event'));
  

  console.log("Path:"+this.uri);

    // setTimeout(() => {
    //   this.logout();
    // },3600000 );


    // setTimeout(() => {
    //   this.logout();
    // }, 120000);
    
    console.log("NNN:",this.N);
    
    console.log("Current:" +this.addHr);
    
 
   
    

    this.log_in_time=Date();
    
    
    

 

    setInterval(()=>{
      this.today=new Date();
      this.code_no=localStorage.getItem('UserId');
      this.email_id=localStorage.getItem('user_email');
      // console.log(this.email_id);
      this.name = localStorage.getItem('user_name');
    this.emp_name= this.name == 'null' ? 'Admin' : localStorage.getItem('user_name');
    // console.log(this.emp_name);
    this.user_type = localStorage.getItem('user_Type');
    this.type= this.user_type =='A' ? 'Admin' : (this.user_type == 'M' ? 'Manager' : (this.user_type == 'T' ? 'Telecaller' : (this.user_type == 'E' ? 'Engineer' :  this.user_type == 'C' ? 'Client' :  'Viewer')));
  //   console.log(this.emp+" " +this.cli);
  //   if(localStorage.getItem('user_Type')=='A' || localStorage.getItem('user_Type')=='T')
  //   {
  //   if(this.cli!=null && this.emp!=null){
    
         
  //     this.toastr.infoToastr(this.emp,"has started working on",this.cli);
  //     this.emp=null;
  //     this.cli=null;
  //   }
  // }


  },500);


this.apollo.watchQuery<any>({
  query: UPDATE_LOGIN_STATUS,
  variables:{
    user_email:localStorage.getItem('user_email'),
  },
  fetchPolicy: 'network-only'

}).valueChanges
.subscribe(({ data}) => {
  // console.log(data);
  if(data.getUserDetailsById[0].login_status==1){
     this.lie=true;

      this.status='Working'
     }
  else{
    // this.logout();
    this.lie=false;
    this.status='Idle';
  }

})

  this.apollo.watchQuery<any>({
        query: GET_PROFILE,
        variables:{
          user_email:localStorage.getItem('user_email'),
          user_type:localStorage.getItem('user_Type')
        },
        // pollInterval:60000
        fetchPolicy:'network-only'
      }).valueChanges
      .subscribe(({ data}) => {
        // console.log(data);
        this.pn=data.getProfileDtls[0].phone_no;
        this.Desig=data.getProfileDtls[0].emp_designation;
        this.District=data.getProfileDtls[0].district_id;
        this.client=data.getProfileDtls[0].client_name;
        this.op_mode=data.getProfileDtls[0].oprn_mode_id;
        this.client_addr=data.getProfileDtls[0].client_addr;
        this.wrk_hrs=data.getProfileDtls[0]. working_hrs;;
        this.rental=data.getProfileDtls[0].rental_upto;
        this.amc=data.getProfileDtls[0].amc_upto;
        this.c_type=data.getProfileDtls[0].client_type_id;
        this.i=data.getProfileDtls[0].image?this.uri+data.getProfileDtls[0].image:'/assets/profile.png';

       
       console.log(this.i);
        // console.log(this.pn,this.Desig);
        this.apollo.watchQuery<any>({
          query: SHOW_DIST

        })
          .valueChanges
          .subscribe(({ data }) => {
            //this.loading = loading;
            // this.districts = data;
            // console.log(data);
            this.distdata=data.getDistrict
            // console.log(this.ctmdata);
            for(let i=0;i<data.getDistrict.length;i++){
              if(this.District==data.getDistrict[i].id)
                this.d_data=data.getDistrict[i].name
            }

           //this.putdata(this.posts);
          });
          this.apollo.watchQuery<any>({
            query: SHOW_CLIENT_TYPE,
            variables:{
              id:""
            }
          })
            .valueChanges
            .subscribe(({ data }) => {
              //this.loading = loading;
              // this.posts = data;
              this.ctmdata=data.getClientTypeData
              // console.log(this.ctmdata);
              for(let i=0;i<data.getClientTypeData.length;i++){
                if( this.c_type==data.getClientTypeData[i].client_id)
                  this.cl_type=data.getClientTypeData[i].client_type
              }


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
                // this.posts1 = data;
                this.opdata=data.getOprnModeData
                // console.log(this.opdata);

                for(let i=0;i<data.getOprnModeData.length;i++){
                  if(this.op_mode==data.getOprnModeData[i].oprn_id
                    )
                    this.oprn_mode=data.getOprnModeData[i].oprn_mode
                }


              // this.putdata(this.posts);
              });


      })







      

  }


  
 

  logout(){


      this.apollo
      .mutate({
        mutation: SEE_UPDATE_STATUS,
        variables:{
          user_id:localStorage.getItem('user_email'),
           login_status:'0'
        }


    })
    .subscribe(({ data}) => {

      // console.log(data);

    })

    localStorage.clear();
    localStorage.setItem('isLoggedIn',"false");
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });




  }
 change_ps()
 {
  // console.log("1sttab")
   this.profile=false;
  //  console.log(this.profile)
 }
 change_cp(){
  //  console.log("2ndtab")
   this.profile=true;
  //  console.log(this.profile)
 }
 save(name:any,ph_no:any,designation:any){
  //  console.log(name+" "+" "+ph_no+" "+designation);

   this.apollo
   .mutate({
     mutation: UPDATE_PROFILE,
     variables:{
      //  postId:this.c.client_code.value,
      //   userType:this.c.client_type.value,
      //    userId:this.c.client_email.value,
      //    Password:this.c.client_pass.value
          id:localStorage.getItem('UserId'),
          user_type:localStorage.getItem('user_Type'),
          phone_no:ph_no,
          emp_name:name,
          designation:designation,
          district_id:'',
          client_name:'',
          oprn_mode_id:'',
          client_type_id:'',
          client_addr:'',
          working_hrs:'',


     }
   }).subscribe(({data})=>{
    //  console.log(data);
            this.con=data;
            // console.log(this.con.updateProfile[0].emp_name)
          if(this.con.updateProfile.success==1){
            localStorage.setItem('user_name',name);
            this.toastr.successToastr('Profile updated successfully!', 'Done!');
          }
          else{
            this.toastr.errorToastr('Something Went Wrong!', 'Error!');
          }

   },error=>{
    this.toastr.errorToastr('Something Went Wrong!', 'Error!');
   })



 }
 change(v:any,v1:any){

  if(v==v1){
    this.conf_pass=false;
  // console.log(v);
  this.id=localStorage.getItem('user_email');
  this.apollo
  .mutate({
    mutation: APPROVE,
    variables:{
      user_email:this.id,
      pass:v
    }
  }).subscribe(({data})=>{
    this.modal=document.getElementById('mymodal_profile')
        //  console.log("Success:" +data);
         this.url=data;
        //  console.log("Success:" +this.url.resetPassword.success);

         if(this.url.resetPassword.success==1)
         { this.toastr.successToastr('Password changed successfully!', 'Done!');}
          else
         { this.toastr.errorToastr('Error while changing password!','Error!!');  }
  },(
    error=>{
      this.toastr.errorToastr('Error while changing password!','Error!!');
      return false;
    })  )
 }
 else{
  this.conf_pass=true;
 }


}


getvalue_client(cl_code:any,cl_name:any,cl_email:any,cl_mobile:any,cl_district:any,cl_Type:any,cl_op_mode:any,cl_address:any,cl_wrk_hrs:any,cl_amc_date:any,cl_rental_date:any){
  // console.log("clientid:" +cl_code);
  // console.log("Clientname:" +cl_name);
  // console.log("client_email:"+cl_email);
  // console.log("client_mobile:"+cl_mobile)
  // console.log("client_district:" +cl_district);
  // console.log("client_type:"+cl_Type);
  // console.log("client_OP_mode:"+cl_op_mode);
  // console.log("address:" +cl_address)
  // console.log("client_Work_hrs:" +cl_wrk_hrs);
  // console.log("client_amc_date:" +cl_amc_date);
  // console.log("rental:" +cl_rental_date);

  this.apollo
   .mutate({
     mutation: UPDATE_PROFILE,
     variables:{
      //  postId:this.c.client_code.value,
      //   userType:this.c.client_type.value,
      //    userId:this.c.client_email.value,
      //    Password:this.c.client_pass.value
          id:localStorage.getItem('UserId'),
          user_type:localStorage.getItem('user_Type'),
          phone_no:cl_mobile,
          emp_name:'',
          designation:'',
          district_id:cl_district,
          client_name:cl_name,
          oprn_mode_id:cl_op_mode,
          client_type_id:cl_Type,
          client_addr:cl_address,
          working_hrs:cl_wrk_hrs,


     }
   }).subscribe(({data})=>{

    this.con=data;
            // console.log(this.con.updateProfile[0].emp_name)
          if(this.con.updateProfile.success==1){
            localStorage.setItem('user_name',cl_name);
            this.toastr.successToastr('Profile updated successfully!', 'Done!');
          }
          else{
            this.toastr.errorToastr('Something Went Wrong!', 'Error!');
          }

   },error=>{
    this.toastr.errorToastr('Something Went Wrong!', 'Error!');
   })


}
Alert(event:any){

    
//   if(this.lie.checked=='true'){
//     this.status='Working'
//  }
//  else{
//    this.status='Idle';
//  }
  this.in=document.getElementById('chec')
  console.log(this.in.checked);
  if(this.in.checked==true){
    this.status='Working';
    this.lie=true;
  }
  else{
    this.status='Idle';
    this.lie=false;

  }

  this.apollo
  .mutate({
    mutation:SEE_UPDATE_STATUS,
    variables:{
      user_id:localStorage.getItem('user_email'),
      login_status: this.in.checked ? '1':'2'
       }
  }).subscribe(({data})=>{
    
  })

}


myconfirm(){

this.show_ConPassword=document.getElementById('conpasswd');
this.newPass=document.getElementById('passwd')
if (this.show_ConPassword.type == "password" || this.newPass.type=="password") {
  this.show_ConPassword.type = "text";
  this.newPass.type="text";
} else {
  this.show_ConPassword.type = "password";
  this.newPass.type="password";
}
}

anchor(e:any){
// console.log(e.target.files[0]);
// this.apollo
// .mutate({
//   mutation:  img_upload,
//   variables:{
//     image:e.target.files[0]
//   }


// })
// .subscribe(({ data}) => {

// console.log(data);

// })


console.log({img: e.target.files[0], user: localStorage.getItem('user_email')});
let file = e.target.files[0];
this.apollo
.mutate({
  mutation: img_upload,
  variables:{
    user_id:localStorage.getItem('user_email'),
    image: e.target.files[0]
  },
  context: {
    useMultipart: true
  }


})
.subscribe(({ data}) => {

console.log(data);
this.bacckend_url=data;
this.i=this.uri+this.bacckend_url.uploadImage.message;
})


}
show(){
 this.inpt=document.getElementById('fileopen');
 this.inpt.click();
}
mouseEnter(){

}
mouseLeave(){
 
}

// @HostListener('window:beforeunload', ['$event'])
// doSomething(event:any) {
//   console.log("CLOSEoRNOT:" +event);
// }

// @HostListener('window:onunload', ['$event'])
// DoSomething($event:any) {
//   console.log("CLOSEoRNOT:" +$event)
//   this.logout();
// }

uplaod_file(){
  console.log('IMAGE:',this.i)
  this.i='/assets/profile.png';
  console.log('IMAGE:',this.i)
  
  this.apollo
.mutate({
  mutation: REMOVE_IMAGE,
  variables:{
    user_id:localStorage.getItem('user_email'),
    },
  })
.subscribe(({ data}) => {

console.log(data);
// this.bacckend_url=data;
// this.i=this.uri+this.bacckend_url.uploadImage.message;
})


}


playAudio(){
  let audio = new Audio();
  audio.src = "../../../../assets/mp3/mixkit-message-pop-alert-2354.mp3";
  audio.load();
  audio.play();
}

}
