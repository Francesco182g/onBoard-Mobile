import { Component, OnInit } from '@angular/core';
import { Utente } from '../login/login.page';
import { Storage} from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Announce } from '../tab1/tab1.page';
import { NFC, Ndef } from '@ionic-native/nfc';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {


    // bean User
    utente: Utente = {
      email: '',
      nome: '',
      cognome: '',
      datanascita: '',
      codice_fiscale: '',
      sesso: '',
      cittàNascita: '',
      indirizzo: '',
      path: '',
    };

    annonunceCollection: AngularFirestoreCollection<Announce>;
    announces: Observable<Announce[]>;

  constructor(private storage: Storage, public alertCtrl: AlertController ,
              public router: Router, private database: AngularFirestore,
              private nfc: NFC, private ndef: Ndef
              ) {
    this.getUserInfo();
    this.annonunceCollection = database.collection<Announce>('annunci', ref => ref.orderBy('titolo', 'asc'));
    this.announces = this.annonunceCollection.valueChanges();
  }

  ngOnInit() {
  }

  getUserInfo() {
    this.storage.get('TOKEN_USER').then( res => {
      if (res) {
        console.log('Token user get');
        console.log(res);
        this.utente = res;
        console.log(this.utente);
      }
    });
  }

  async showAnnounce(nome, descrizione) {
    const alert = await this.alertCtrl.create({
      header: nome,
      message: descrizione,
      buttons: ['Conferma']
    });
    alert.present();
  }

  openSettings() {
    this.router.navigate(['tabs/settings']);
  }

  testNFC() {
    this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');
    }, (err) => {
      console.log('error attaching ndef listener', err);
    }).subscribe((event) => {
      console.log('received ndef message. the tag contains: ', event.tag);
      console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));

      const message = this.ndef.textRecord('Hello world');
      this.nfc.share([message]);
    });
  }


}
