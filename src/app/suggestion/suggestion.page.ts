import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

export interface Message {
  user: string;
  message: string;
}

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.page.html',
  styleUrls: ['./suggestion.page.scss'],
})
export class SuggestionPage implements OnInit {

  userEmail: string;

  messageCollection: AngularFirestoreCollection<Message>;
  messages: Observable<Message[]>;

  constructor(public afs: AngularFirestore, public afDatabase: AngularFireDatabase,
              private authService: AuthenticationService, public alertCtrl: AlertController) {
    this.afs.collection('people');
    this.userEmail = this.authService.userDetails().email;
    this.messageCollection = afs.collection<Message>('message', ref => ref.orderBy('message', 'asc'));
    this.messages = this.messageCollection.valueChanges();
   }

  ngOnInit() {

  }

  addMessage(value) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('message').add({
        user: this.userEmail,
        message: value

      })
      .then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }

  async showAnnounce(nome, descrizione) {
    const alert = await this.alertCtrl.create({
      header: 'Da: ' + nome,
      message: descrizione,
      buttons: ['Conferma']
    });
    alert.present();
  }

  async insertMess() {
    console.log('click');
    const alert = await this.alertCtrl.create({
      header: 'Inviaci un suggerimento',
      inputs: [{
      name: 'mess',
      placeholder: 'Descrizione > 5 caratteri',
      value: '',
    },
  ],
  buttons: [
    {
      text: 'Non Inviare',
      handler: () => {
        console.log('Disagree clicked');
        return;
      }
    },
    {
      text: 'Invia',
      handler: data => {
        this.addMessage(data.mess);
        return;
        }
      }
  ]
});
    alert.present();
}

}
