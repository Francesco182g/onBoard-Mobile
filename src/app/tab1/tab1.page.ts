import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
import { Utente } from '../login/login.page';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

export interface Announce {
  descrizione: string;
  titolo: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  userEmail: string;

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
  };



  annonunceCollection: AngularFirestoreCollection<Announce>;
  announces: Observable<Announce[]>;

  constructor(private database: AngularFirestore, public router: Router,
              private authService: AuthenticationService, private storage: Storage,
              public alertCtrl: AlertController
    ) {
    this.userEmail = this.authService.userDetails().email;
    this.storage.get('TOKEN_USER').then( res => {
      if (res) {
        console.log('Get User Data');
        this.utente = res;
        console.log(this.utente);
      }
    });
    this.annonunceCollection = database.collection<Announce>('annunci', ref => ref.orderBy('titolo', 'asc'));
    this.announces = this.annonunceCollection.valueChanges();
  }

  ngOnInit() {
    if (this.authService.userDetails()) {
     console.log(this.userEmail);
    } else {
      this.router.navigate(['login']);
    }
  }

  logout() {
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.router.navigate(['login']);
    })
    .catch(error => {
      console.log(error);
    });
  }

  openTab2() {
    this.router.navigate(['tabs/tab2']);
  }

  openTab3() {
    this.router.navigate(['tabs/tab3']);
  }

  openTab4() {
    this.router.navigate(['tabs/tab4']);
  }

  openTab5() {
    this.router.navigate(['tabs/tab5']);
  }

  openSettings() {
    this.router.navigate(['tabs/settings']);
  }

  openSuggestion() {
    this.showAnnounce('Suggerimenti', 'Inserisci un suggerimento per migliorare InSella :)');
    this.router.navigate(['tabs/suggestion']);
  }
  async showAnnounce(nome, descrizione) {
    const alert = await this.alertCtrl.create({
      header: nome,
      message: descrizione,
      buttons: ['Conferma']
    });
    alert.present();
  }
}
