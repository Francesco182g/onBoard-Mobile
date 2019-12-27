import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticationService {

  constructor() { }
  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err));
    });
   }

   logoutUser() {
     return new Promise((resolve, reject) => {
       if (firebase.auth().currentUser) {
         firebase.auth().signOut()
         .then(() => {
           console.log('LOG Out');
           resolve();
         }).catch((error) => {
           reject();
         });
       }
     });
   }

   userDetails() {
    console.log('Login Success ' + firebase.auth().currentUser);
    return firebase.auth().currentUser;
   }
}
