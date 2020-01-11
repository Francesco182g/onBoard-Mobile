import { Component, OnInit } from '@angular/core';
import { Utente } from '../login/login.page';
import { Storage} from '@ionic/storage';
import { AlertController } from '@ionic/angular';

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
    };


  constructor(private storage: Storage, public alertCtrl: AlertController) {
    this.getUserInfo();
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

}
