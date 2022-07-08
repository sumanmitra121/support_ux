import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

const EMAIL_CHECK = gql`
  query checkEmail($email_id:String!) {
    checkEmail(email_id:$email_id) {
      success
      message
    }
  }
`;
const RESEND_PASSWORD = gql`
  mutation forgotPassword($email_id:String!) {
    forgotPassword(email_id:$email_id) {
      success
      message
    }
  }
`;

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: [
    './forgetpass.component.css',
    '../../../assets/Login_assets/css/apps.css',
    '../../../assets/Login_assets/css/apps_inner.css',
    '../../../assets/Login_assets/css/res.css',
  ],
})
export class ForgetpassComponent implements OnInit {
  LoginForm!: FormGroup;
  login: boolean = false;
  input_email: any;
  password: any;
  error_msg: any;
  success_msg: any;
  error: boolean = true;
  disabled_button: boolean = true;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    localStorage.setItem('address', '/forgetpassword');
    localStorage.setItem('forgetpassword','0');
    console.log('Branch');
    // localStorage.setItem("address",'/forgetpassword');

    this.LoginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }

  get f() {
    // console.log("touched:" +this.LoginForm.touched);
    return this.LoginForm.controls;
  }

  prevent(e: any) {
    console.log(this.error);
    this.disabled_button = true;
    this.input_email = e.target.value;
    console.log(this.input_email);
    this.apollo
      .watchQuery<any>({
        query: EMAIL_CHECK,
        variables: {
          email_id: this.input_email,
        },
      })
      .valueChanges.subscribe(({ data }) => {
        console.log(data);
        if (data.checkEmail.success == 1) {
          this.error = true;
          console.log(this.error)
          this.success_msg = data.checkEmail.message;
          this.disabled_button = false;
        } else {
          this.error = false;
          console.log(this.error)
          this.error_msg = data.checkEmail.message;
          this.disabled_button = true;
        }
      });
  }

  Submit() {
    console.log(this.f.email.value);
    this.login = true;
    console.log(this.error);
    console.log(this.f.email.value);
    if (this.LoginForm.invalid) {
      // this.sent=true;
      console.log('asdasda');
      this.disabled_button = true;
      return;
    } else {
      this.apollo
        .watchQuery<any>({
          query: EMAIL_CHECK,
          variables: {
            email_id: this.f.email.value,
          },
        })
        .valueChanges.subscribe(({ data }) => {
          console.log(data);
          if (data.checkEmail.success == 1) {
            console.log(this.error);

            this.disabled_button = false;
            this.apollo
              .mutate({
                mutation: RESEND_PASSWORD,
                variables: {
                  email_id:this.f.email.value,
                },
              })
              .subscribe(({ data }) => {
                console.log(data);
                this.password = data;

                console.log(this.password.forgotPassword.message);
              });
              localStorage.setItem('forgetpassword','1');
            console.log(data.checkEmail.message);
            this.router.navigate(['/']);
            console.log('Email ID:' + this.f.email.value);
          }
          else {

            this.error = false;
            console.log(this.error);
            this.error_msg =data.checkEmail.message;
            console.log(data.checkEmail.message);
            this.disabled_button = true;
          }
        });
    }
    console.log(this.error);
  }

  close_alert() {
    this.error = true;
    console.log(this.error);
  }
}
