import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

@Injectable()
export class AuthenticationService {

  constructor(private storage: Storage, private platform: Platform) { }

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
           console.log('Logout');
           this.tokenOut();
           resolve();
         }).catch((error) => {
           reject();
         });
       }
     });
     this.tokenOut();
   }

   userDetails() {
    console.log('Login Success ' + firebase.auth().currentUser);
    return firebase.auth().currentUser;
   }

   tokenOut() {
    this.storage.set('TOKEN_FIRE', null);
    this.storage.set('TOKEN_USER', null);
    this.storage.set('TOKEN_ONE', false);
   }
}
