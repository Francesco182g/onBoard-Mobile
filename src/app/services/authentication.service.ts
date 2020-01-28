import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export class AuthenticationService {
  private reboot: Subject<boolean> = new Subject();
  private reboot$ = this.reboot.asObservable();

  constructor(private storage: Storage, private platform: Platform, public alertCtrl: AlertController,
              public router: Router) {
                this.platform = platform;
               }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err));
    });
   }

   async logoutUser() {
    const alert = await this.alertCtrl.create({
      header: 'Attenzione!',
      message: 'Sei sicuro di voler effettuare il logout?',
      buttons: [
        {
          text: 'NO',
          handler: () => {
            console.log('Disagree clicked');
            return;
          }
        },
        {
          text: 'SI',
          handler: data => {
            this.logout();
            return;
          }
        }
        ]
      });
    alert.present();
  }

   logout() {
     return new Promise((resolve, reject) => {
       if (firebase.auth().currentUser) {
         firebase.auth().signOut()
         .then(() => {
           console.log('Logout');
           this.tokenOut();
           resolve();
           this.tokenOut();
           this.router.navigate(['login']);
         }).catch((error) => {
           reject();
           this.tokenOut();
         });
       }
     });
   }

   userDetails() {
    console.log('Login Success ' + firebase.auth().currentUser);
    return firebase.auth().currentUser;
   }

   tokenOut() {
    this.storage.set('TOKEN_FIRE', null);
    this.storage.set('TOKEN_USER', null);
    this.storage.set('TOKEN_ONE', false);
    this.restart();
   }

  public watchReboot() {
    return this.reboot$;
  }

  public restart() {
    this.reboot.next(true);
  }

}
