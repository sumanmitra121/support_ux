import { Component, OnInit } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations'

import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

const APPROVE=gql`
mutation  approveUser($email_id:String!){
  approveUser(email_id:$email_id){
    success
    message
 }

}`



@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css',
    '../../../assets/masters_css_js/css/font-awesome.css',
    '../../../assets/masters_css_js/css/apps.css',
    '../../../assets/masters_css_js/css/apps_inner.css',
    '../../../assets/masters_css_js/css/res.css'
  ],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({ opacity: 0 })))
    ])
  ]

})
export class TemplateComponent implements OnInit {
  message = true;
  loginbtn = true;

  url:any;
  x:any;
  constructor(private router:Router,private route: ActivatedRoute,private apollo:Apollo) {}
  divwelcome = false;
   Id:any;
  ngOnInit(): void {
    localStorage.setItem('address','/template');

    this.route.queryParams.subscribe(params => {
      this.Id= params['id'];
      console.log("id:" +this.Id);

  });
  // this.url = decodeURIComponent(window.location.href);
  //  console.log(localStorage.getItem('address'));


 }
  confirm() {

    this.apollo
    .mutate({
      mutation: APPROVE,
      variables:{
        email_id:this.Id
      }
    }).subscribe(({data})=>{
          //  console.log("Success:" +data);
           this.url=data;
           console.log("Success:" +this.url.approveUser.success);
           if(this.url.approveUser.success==1){
            this.divwelcome = true;
            setTimeout(() => {
              this.message = false
            }, 1000);
            setTimeout(() => {
              this.loginbtn = false
            }, 2500);
           }
          else{
            this.showsnackbar();
          }

       },error=>{ this.showsnackbar()
       })


  }

  showsnackbar() {
    // alert("error");
     this.x = document.getElementById("snackbar");
     this.x.className = "show";
     setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
   }

  go() {
    this.router.navigate(['/']);
  }

//  For getting value frrom Encoded url
// function myFunction() {
//   var uri = "https://w3schools.com/my test.asp?name=Suman&car=Mitra";
//    var res = decodeURIComponent(uri);

// var url = new URL(res);
// var d = url.searchParams.get("car");
// var c = url.searchParams.get("name");
// console.log(c);

//   document.getElementById("demo1").innerHTML = d;
//   document.getElementById("demo").innerHTML = c;
// }

}
