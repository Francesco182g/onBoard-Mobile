import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private navCtrl: Router,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

   // tslint:disable-next-line: variable-name
   validations_form: FormGroup;
   errorMessage = '';

 // tslint:disable-next-line: variable-name
 validation_messages = {
   email: [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Please enter a valid email.' }
   ],
   password: [
     { type: 'required', message: 'Password is required.' },
     { type: 'minlength', message: 'Password must be at least 5 characters long.' }
   ]
 };

 ngOnInit() {

   this.validations_form = this.formBuilder.group({
     email: new FormControl('', Validators.compose([
       Validators.required,
       Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
     ])),
     password: new FormControl('', Validators.compose([
       Validators.minLength(5),
       Validators.required
     ])),
   });
 }
 loginUser(value) {
   this.authService.loginUser(value)
   .then(res => {
     console.log(res);
     this.errorMessage = '';
     this.navCtrl.navigate(['tabs']);
   }, err => {
     this.errorMessage = err.message;
   });
 }

}
