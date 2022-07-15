
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Apollo, gql} from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';



const GET_POST_LOGIN = gql`
query userLogin($user_id: String!, $password: String!){
  userLogin(user_id: $user_id, password: $password){
    success,
    message
  }
}
`;

const GET_USER_TYPE=gql`
query  getUserDetailsById($user_id:String!){
  getUserDetailsById(user_id:$user_id){
    user_type,
    user_status
  }
}
`



// query{
//   userLogin(user_id: "subhamsamanta408@gmail.com", password: "123"){
//     success,
//     message
//   }
// }


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
              '../../../assets/Login_assets/css/apps.css',
               '../../../assets/Login_assets/css/apps_inner.css',
              '../../../assets/Login_assets/css/res.css']

})
export class LoginComponent implements OnInit {
   show_eye: boolean = false;
  //  error_for_user:any="Please Check Your User ID Or Password";
  error_for_user:any;
   error_log:boolean=true;
   Success:any;
  recaptcha:any='';
  val:any;
  clone:any;
  captch:boolean=false;
  errormsg:any="Captcha mismatch";
 constructor(private router:Router,private fb:FormBuilder,private apollo: Apollo,private spinner: NgxSpinnerService) { }
  LoginForm!: FormGroup;
  login:boolean=false;
  loading!: boolean;
  userid:any;
  user:any;
  successfull_register:boolean=true;
  show_password:any;
  x:any;
  load:any;
  successfull_password:boolean=true;







  ngOnInit(): void {

      

    // if(localStorage.getItem('isLoggedIn')=='true'){
    //   localStorage.clear();
    //   localStorage.setItem('isLoggedIn','false');
    //   localStorage.setItem('address','/');
    //   this.router.navigate(['/']);

    // }
   



     localStorage.setItem('address', '/');


    if(localStorage.getItem("Employee_signup")== '1'){
      this.successfull_register=false

    }
    if(localStorage.getItem("forgetpassword")=='1'){
      this.successfull_password=false;

    }


    var alpha=['A','B','C','D','E','F','G','H','I','J','K','L','M','N',
    'O','P','Q','R','S','T','U','V','W','X','Y','Z',
    '1','2','3','4','5','6','7','8','9','0',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n',
    'o','p','q','r','s','t','u','v','w','x','y','z',];
    var a=alpha[Math.floor(Math.random()*62)]
    var b=alpha[Math.floor(Math.random()*62)]
    var c=alpha[Math.floor(Math.random()*62)]
    var d=alpha[Math.floor(Math.random()*62)]
    // var e=alpha[Math.floor(Math.random()*62)]
    // var f=alpha[Math.floor(Math.random()*62)]
    // var g=alpha[Math.floor(Math.random()*62)]
    var sum=a+b+c+d;
    this.recaptcha=document.getElementById("capt_login");
    this.recaptcha.value=sum;



    this.LoginForm = this.fb.group({
      username:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:['',Validators.required],
      captcha:['',Validators.required]
    });
  }

  get f() {
    return this.LoginForm.controls;

  }

  // goto_home(){
  //   console.log("dashboard");
  //    this.router.navigate(['/dashboard'])

  // }

  // Submit(){
  //   console.log("dashboard")
  //   this.login=true;
  //   if(this.LoginForm.invalid){
  //     return;
  //   }
  //   else{
  //     localStorage.setItem('username',this.f.username.value);
  //     localStorage.setItem('password',this.f.password.value);

  //     console.log("UserName:" +this.f.username.value)
  //     console.log("PassWord:" +this.f.password.value)
  //     console.log("dashboard")
  //       this.router.navigate(['/dashboard'])
  //   }

  // }



  Submit(){
    this.error_log=true;
    this.recaptcha=document.getElementById("capt_login");
    // console.log("dashboard1"+this.f.username.value,this.f.password.value)
    this.login=true;
    if(this.LoginForm.invalid){
      this.captch=false;
      this.error_log=true;
      return;
    }
    else{
      // localStorage.setItem('username',this.f.username.value);
      // localStorage.setItem('password',this.f.password.value);

      // console.log("UserName:" +this.f.username.value)
      // console.log("PassWord:" +this.f.password.value)
      // console.log("Captcha;" +this.f.captcha.value);
      // console.log(this.recaptcha.value);

      if(this.f.captcha.value != this.recaptcha.value){
        this.captch=true;
        // console.log("false")
       }
      else{
        this.error_log=true;
        this.captch=false;
          // console.log("dashboard")


          this.spinner.show();

         this.apollo.watchQuery<any>({
            query: GET_POST_LOGIN,
            fetchPolicy: 'network-only',
            variables:{
              user_id:this.f.username.value,
              password:this.f.password.value
            }



          }).valueChanges
            .subscribe(({ data}) => {
              // console.log(data);
          // localStorage.setItem("user_email",this.f.username.value);



               this.Success= data.userLogin.success;
               this.spinner.hide();
              //  console.log("Success:" +this.Success.user_status);

               if( this.Success == 1){
                localStorage.setItem('Active','1');
                // console.log("data:" + JSON.stringify(JSON.parse(data.userLogin.message)[0].code_no));
                localStorage.setItem("UserId",JSON.parse(data.userLogin.message)[0].code_no);
                localStorage.setItem("user_Type",JSON.parse(data.userLogin.message)[0].user_type);
                localStorage.setItem("user_name",JSON.parse(data.userLogin.message)[0].emp_name);
                localStorage.setItem("user_email",this.f.username.value)
                // console.log("user_type:" +JSON.parse(data.userLogin.message)[0].user_type);




                localStorage.setItem('isLoggedIn',"true");

                this.user=JSON.parse(data.userLogin.message);
                sessionStorage.setItem('reloaded','1');

                //  console.log("success");
                //  console.log("userid:" + this.user)
                 this.router.navigate(['/dashboard']);



               }
               else if(this.Success == 0){



                this.error_for_user=JSON.parse(JSON.stringify(data.userLogin.message));
                // console.log("unsuccess:" +this.error_for_user);
                // console.log("Failure");

                this.error_log=false;
                localStorage.setItem('isLoggedIn',"false");

               }




               else
                  this.spinner.hide();
                  this.showsnackbar();
          },error=>{
            this.spinner.hide();
            this.showsnackbar()
           }
          );



      }
    }

  }

  showsnackbar() {
    // alert("error");
     this.x = document.getElementById("snackbar");
     this.x.className = "show";
     setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
   }

  refresh_captcha(){

       var alpha=['A','B','C','D','E','F','G','H','I','J','K','L','M','N',
      'O','P','Q','R','S','T','U','V','W','X','Y','Z',
      '1','2','3','4','5','6','7','8','9','0',
      'a','b','c','d','e','f','g','h','i','j','k','l','m','n',
      'o','p','q','r','s','t','u','v','w','x','y','z',];
      var a=alpha[Math.floor(Math.random()*62)]
      var b=alpha[Math.floor(Math.random()*62)]
      var c=alpha[Math.floor(Math.random()*62)]
      var d=alpha[Math.floor(Math.random()*62)]
      var e=alpha[Math.floor(Math.random()*62)]
      var f=alpha[Math.floor(Math.random()*62)]
      var g=alpha[Math.floor(Math.random()*62)]
      var sum=a+b+c+d;
      this.recaptcha=document.getElementById("capt_login");
      this.recaptcha.value=sum;
      // this.load=document.getElementById("refresh")?.setAttribute("class",'fa fa-refresh');

  }










  close_alert(){
    localStorage.setItem("Employee_signup",'0');
    this.successfull_register=true;
  }

  myFunction(){
    this.show_password=document.getElementById('passwd');
    if (this.show_password.type === "password") {
      this.show_password.type = "text";
    } else {
      this.show_password.type = "password";
    }

  }

  close_alert_pass(){
    localStorage.setItem("forgetpassword",'0');
    this.successfull_password=true;
  }


}
